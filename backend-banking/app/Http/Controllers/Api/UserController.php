<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AccountBalance;
use App\Models\CheckDeposit;
use App\Models\Group;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::query();
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
        }
        $users = $query->paginate(10);
        return response()->json(['data' => $users], 200);
    }

    public function getUserCheckDetails($userId, $checkControlId)
    {
        $user = User::with(['transactions', 'accountBalance'])
                    ->findOrFail($userId);
        $checkDeposit = CheckDeposit::with('user')
                    ->where('id', $checkControlId)
                    ->firstOrFail();

        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'account_number' => $user->accountBalance?->id ?? 0,
            'transactions' => $user->transactions,
            'status' => $user->status,
            'check_deposit_details' => [
                'id' => $checkDeposit->id,
                'amount' => $checkDeposit->amount,
                'description' => $checkDeposit->description,
                'profile_image' => $checkDeposit->picture_url,
                'formatted_created_at' => $checkDeposit->formatted_created_at,
            ],
        ];

        return response()->json($userData);
    }


    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $request['password'] = Hash::make($request['password']);
        $user = User::create($request->except(['group_id', 'profile_image']));

        AccountBalance::create([
            'user_id' => $user->id,
            'balance' => 0
        ]);

        return response()->json(['data' => $user], 201);
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully.'], 200);
    }
}

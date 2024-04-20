<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CheckDeposit;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

}

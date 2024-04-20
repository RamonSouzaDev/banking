<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AccountBalance;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Login api
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('MyApp')->accessToken;

            return response()->json(['token' => $token, 'name' => $user->name], 200);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    public function register(Request $request): JsonResponse
    {
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'pass' => Hash::make($request->password),
        ]);
        $user->save();

        AccountBalance::create([
            'balance' => 0,
            'user_id' => $user->id
        ]);

        $token = $user->createToken('MyApp')->accessToken;

        return response()->json([
            'message' => 'Successfully registered',
            'token' => $token,
            'name' => $user->name
        ], 201);
    }

    /**
     * Logout the user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::logout();
        $request->session()->flush();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    /**
     * Update user's password
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePassword(Request $request): JsonResponse
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|min:8',
            'confirm_password' => 'required|same:new_password',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        if (Hash::check($request->current_password, $user->password)) {
            $user->update(['password' => bcrypt($request->new_password)]);

            return response()->json(['message' => 'Password updated successfully'], 200);
        } else {
            return response()->json(['error' => 'Current password does not match user password'], 422);
        }
    }

}

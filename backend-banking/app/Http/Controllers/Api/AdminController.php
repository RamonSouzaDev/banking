<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CheckDeposit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function approveDeposit($id)
    {
        $deposit = CheckDeposit::findOrFail($id);

        DB::transaction(function () use ($deposit) {
            $deposit->update(['status' => 'approved']);
            $deposit->user->accountBalance->increment('balance', $deposit->amount);
            $deposit->user->transactions()->create([
                'amount' => '+'.$deposit->amount,
                'description' => $deposit->description
            ]);
        });

        return response()->json(['message' => 'Deposit approved and balance updated']);
    }

    public function denyDeposit($id)
    {
        $deposit = CheckDeposit::findOrFail($id);
        
        $deposit->update(['status' => 'rejected']);
        
        return response()->json(['message' => 'Deposit denied']);
    }

}
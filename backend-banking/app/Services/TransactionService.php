<?php

namespace App\Services;

use App\Models\CheckDeposit;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionService
{
    public function deposit(User $user, $amount, $description, $picturePath)
    {
        return $user->checkDeposits()->create([
            'amount' => $amount,
            'description' => $description,
            'picture' => $picturePath,
            'status' => 'pending'
        ]);
    }

    public function getPendingCheckDeposits($perPage = 10)
    {
        return CheckDeposit::with('user')
                        ->where('status', 'pending')
                        ->orderBy('created_at', 'desc')
                        ->paginate($perPage);
    }

    public function getBalance(User $user)
    {
        $balance = $user->accountBalance?->balance ?? 0;
        $income = $user->transactions()->where('amount', '>', 0)->sum('amount');
        $expenses = $user->transactions()->where('amount', '<', 0)->sum('amount');

        return [
            'balance' => $balance,
            'income' => $income,
            'expenses' => $expenses
        ];
    }

    public function processPurchase(User $user, $amount, $description)
    {
        return DB::transaction(function () use ($user, $amount, $description) {
            $accountBalance = $user->accountBalance;

            if ($accountBalance->balance < $amount) {
                throw new \Exception('Insufficient funds');
            }

            $accountBalance->balance -= $amount;
            $accountBalance->save();

            $transaction = $user->transactions()->create([
                'amount' => -$amount,
                'description' => $description,
            ]);

            return $accountBalance->balance;
        });
    }

    public function getUserTransactions(User $user)
    {
        return $user->transactions()->orderBy('created_at', 'asc')->get();
    }

    public function getUserCheckDeposits(User $user, $status = null, $month = null, $perPage)
    {
        return $user->checkDeposits()
                    ->when($status, function ($query) use ($status) {
                        $query->where('status', $status);
                    })
                    ->when($month, function ($query) use ($month) {
                        $query->whereMonth('created_at', '=', date('m', strtotime($month)))
                              ->whereYear('created_at', '=', date('Y', strtotime($month)));
                    })
                    ->orderBy('created_at', 'asc')
                    ->paginate($perPage);
    }

    public function getIncomesByMonth(User $user, $month, $perPage)
    {
        return $user->transactions()
                    ->where('amount', '>', 0)
                    ->whereYear('created_at', substr($month, 0, 4))
                    ->whereMonth('created_at', substr($month, 5, 2))
                    ->orderBy('created_at', 'asc')
                    ->paginate($perPage);
    }

    public function getUserTransactionsByMonth(User $user, $month, $perPage)
    {
        $date = Carbon::createFromFormat('Y-m', $month);
        return $user->transactions()
                    ->whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->orderBy('created_at', 'asc')
                    ->paginate($perPage); 
    }
}

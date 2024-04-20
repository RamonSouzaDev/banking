<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CheckDeposit;
use App\Services\TransactionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    protected $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function deposit(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'picture' => 'nullable|image'
        ]);

        $user = Auth::user();
        $amount = $request->amount;
        $description = $request->description;
        $picture = $request->file('picture');
        $picturePath = $picture->store('public/checks');

        try {
            $checkDeposit = $this->transactionService->deposit($user, $amount, $description, $picturePath);
            return response()->json(['message' => 'Check deposit submitted successfully', 'checkDeposit' => $checkDeposit], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function listPendingDeposits(Request $request)
    {
        $perPage = $request->input('perPage', 10);

        try {
            $pendingDeposits = $this->transactionService->getPendingCheckDeposits($perPage);
            return response()->json($pendingDeposits);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getIncomes(Request $request)
    {
        $user = Auth::user();
        $month = $request->query('month');
        $perPage = $request->input('perPage', 5);
    
        $incomes = $this->transactionService->getIncomesByMonth($user, $month, $perPage);
        return response()->json($incomes);
        
    }

    public function purchase(Request $request)
    {
        $user = Auth::user();
        $amount = $request->input('amount');
        $description = $request->input('description');

        try {
            $newBalance = $this->transactionService->processPurchase($user, $amount, $description);
            return response()->json(['message' => 'Purchase successful', 'new_balance' => $newBalance], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function getBalance(Request $request)
    {
        $user = Auth::user();
        $financialData = $this->transactionService->getBalance($user);
        
        return response()->json($financialData, 200);
    }

    public function transactions(Request $request)
    {
        $user = Auth::user();
        $perPage = $request->input('perPage', 10);
        $transactions = $user->transactions()->orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($transactions);
    }

    public function getChecks(Request $request)
    {
        $user = Auth::user();
        $status = $request->query('status');
        $month = $request->query('month');
        $perPage = $request->input('perPage', 5);

        $checks = $this->transactionService->getUserCheckDeposits($user, $status, $month, $perPage);
        return response()->json($checks);
    }

    public function transactionsByMonth(Request $request)
    {
        $user = Auth::user();
        $month = $request->query('month');
        $perPage = $request->input('perPage', 5);

        $transactions = $this->transactionService->getUserTransactionsByMonth($user, $month, $perPage);
        return response()->json($transactions);
    }
}

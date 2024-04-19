<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FinancialDataController;
use App\Http\Controllers\Api\GroupController;
use App\Http\Controllers\Api\GroupPermissionController;
use App\Http\Controllers\Api\GroupUserController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rota de login sem autenticação
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    
    // User routes
    Route::resource('users', UserController::class)->only(['index', 'show', 'update', 'destroy']);
    Route::get('/user-details/{userId}/{checkId}', [UserController::class, 'getUserCheckDetails']);
    Route::get('/user', function () {
        return auth()->user();
    });

    // Transaction routes
    Route::post('/deposit', [TransactionController::class, 'deposit'])->name('transactions.deposit');
    Route::post('/purchase', [TransactionController::class, 'purchase'])->name('transactions.purchase');
    Route::get('/balance', [TransactionController::class, 'getBalance'])->name('transactions.getBalance');
    Route::get('/transactions', [TransactionController::class, 'transactions'])->name('transactions.index');
    Route::get('/checks', [TransactionController::class, 'getChecks'])->name('transactions.getChecks');
    Route::get('/expenses', [TransactionController::class, 'transactionsByMonth'])->name('transactions.byMonth');
    Route::get('/incomes', [TransactionController::class, 'getIncomes'])->name('transactions.getIncomes');
    
    // Admin routes for managing check deposits
    Route::get('/admin/check-deposits/pending', [TransactionController::class, 'listPendingDeposits'])->name('admin.check-deposits.pending');
    Route::post('check-deposit/approve/{checkDeposit}', [AdminController::class, 'approveDeposit']);
    Route::post('check-deposit/deny/{checkDeposit}', [AdminController::class, 'denyDeposit']);
});



<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class TransactionsTableSeeder extends Seeder
{
    public function run()
    {
        $users = User::all(); // Fetch all users
        $months = range(1, 12); // Array with numbers 1 to 12 for months
        $descriptions = [
            'Grocery shopping', 'Online Subscription', 'Utility Bill', 'Rent Payment',
            'Restaurant Visit', 'Movie Ticket', 'Gym Membership', 'Electronics Purchase',
            'Book Purchase', 'Car Maintenance', 'Travel Expenses', 'Gift Purchase',
            'Healthcare Expenses', 'Insurance Payment', 'Clothing Purchase', 'Pet Supplies',
            'Education Fees', 'Home Improvement', 'Sports Equipment', 'Charity Donation'
        ];

        foreach ($users as $user) {
            foreach ($months as $month) {
                for ($i = 0; $i < 20; $i++) {
                    // Generate a random day within the month
                    $day = rand(1, 28); // Assume each month has at least 28 days for simplicity

                    // Create a base date for the transaction
                    $baseDate = Carbon::create(2024, $month, $day, 0, 0, 0);

                    $transactionDate = $baseDate->copy()->addHours(rand(8, 17))->addMinutes(rand(0, 59));

                    $amount = $i % 2 == 0 ? -(rand(10, 500)) : rand(100, 2000); // Negative for expenses, positive for deposits

                    $description = $descriptions[array_rand($descriptions)];

                    Transaction::create([
                        'user_id' => $user->id,
                        'amount' => $amount,
                        'description' => $description . " in " . Carbon::createFromFormat('!m', $month)->format('F'), // Adding month name to the description for clarity
                        'created_at' => $transactionDate,
                        'updated_at' => $transactionDate,
                    ]);
                }
            }
        }
    }
}

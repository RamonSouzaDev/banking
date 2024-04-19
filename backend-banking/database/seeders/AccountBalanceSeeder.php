<?php

namespace Database\Seeders;

use App\Models\AccountBalance;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountBalanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $users = User::all();

        foreach ($users as $user) {
            AccountBalance::create([
                'user_id' => $user->id,
                'balance' => rand(100, 5000)
            ]);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            TransactionsTableSeeder::class,
            CheckDepositsTableSeeder::class,
            AccountBalanceSeeder::class
        ]);
    }
}


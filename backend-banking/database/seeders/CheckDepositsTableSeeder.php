<?php

namespace Database\Seeders;

use App\Models\CheckDeposit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CheckDepositsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        CheckDeposit::factory()->count(150)->create();
    }

}

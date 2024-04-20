<?php

namespace Database\Factories;

use App\Models\AccountBalance;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AccountBalanceFactory extends Factory
{
    /**
     * The name of the model that the factory corresponds to.
     *
     * @var string
     */
    protected $model = AccountBalance::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'balance' => $this->faker->randomFloat(2, 0, 10000),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    /**
     * The name of the model that the factory corresponds to.
     *
     * @var string
     */
    protected $model = Transaction::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'amount' => $this->faker->numberBetween(100, 500),
            'description' => $this->faker->sentence,
        ];
    }
}

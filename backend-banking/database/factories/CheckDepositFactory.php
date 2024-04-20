<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CheckDepositFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'picture' => $this->faker->imageUrl(),
            'amount' => $this->faker->randomFloat(2, 100, 5000),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'description' => $this->faker->sentence()
        ];
    }
}

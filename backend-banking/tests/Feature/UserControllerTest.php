<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\CheckDeposit;
use App\Traits\InteractsWithPassport;

class UserControllerTest extends TestCase
{
    use RefreshDatabase, InteractsWithPassport;

    public function test_index()
    {
        $this->authenticateUser();
        User::factory()->count(15)->create();

        $response = $this->getJson('/api/users');

        $response->assertStatus(200)->assertJson(['data' => []]);
    }

    public function test_get_user_check_details_found()
    {
        $user = $this->authenticateUser();
        $checkDeposit = CheckDeposit::factory()->for($user)->create();

        $response = $this->getJson("/api/user-details/{$user->id}/{$checkDeposit->id}");

        $response->assertStatus(200)
            ->assertJson([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'account_number' => 0,
                'transactions' => $user->transactions->toArray(),
                'check_deposit_details' => [
                    'id' => $checkDeposit->id,
                    'amount' => $checkDeposit->amount,
                    'description' => $checkDeposit->description,
                    'profile_image' => $checkDeposit->picture_url,
                    'formatted_created_at' => $checkDeposit->formatted_created_at,
                ]
            ]);
    }
}

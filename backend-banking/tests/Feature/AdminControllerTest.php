<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Tests\TestCase;
use App\Models\User;
use App\Models\Transaction;
use App\Models\CheckDeposit;
use App\Models\AccountBalance;
use App\Traits\InteractsWithPassport;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AdminControllerTest extends TestCase
{
    use RefreshDatabase, InteractsWithPassport;

    /** @test */
    public function it_approves_a_deposit_and_updates_balance()
    {
        $user = User::factory()->create();
        AccountBalance::factory()->for($user)->create(['balance' => 1000]);
        $deposit = CheckDeposit::factory()->for($user)->create(['amount' => 500, 'status' => 'pending']);

        $response = $this->actingAs($user, 'api')->postJson("/api/check-deposit/approve/{$deposit->id}");

        $response->assertStatus(200)
            ->assertJson(['message' => 'Deposit approved and balance updated']);

        $deposit->refresh();
        $user->accountBalance->refresh();

        $this->assertEquals('approved', $deposit->status);
        $this->assertEquals(1500, $user->accountBalance->balance);
        $this->assertDatabaseHas('transactions', [
            'user_id' => $user->id,
            'amount' => '+500',
            'description' => $deposit->description
        ]);
    }

    /** @test */
    public function it_denies_a_deposit()
    {
        $user = User::factory()->create();
        $deposit = CheckDeposit::factory()->for($user)->create(['amount' => 500, 'status' => 'pending']);

        $response = $this->actingAs($user, 'api')->postJson("/api/check-deposit/deny/{$deposit->id}");

        $response->assertStatus(200)
            ->assertJson(['message' => 'Deposit denied']);

        $deposit->refresh();

        $this->assertEquals('rejected', $deposit->status);
    }

    /** @test */
    public function it_handles_months_with_no_transactions()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $monthWithoutTransactions = now()->subYear()->format('Y-m');
        $response = $this->getJson(route('transactions.byMonth') . "?month={$monthWithoutTransactions}");

        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data');
    }

    /** @test */
    public function it_handles_months_with_no_incomes()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $monthWithoutTransactions = now()->subYear()->format('Y-m');
        $response = $this->getJson("/api/incomes?month={$monthWithoutTransactions}");

        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data'); // Ensures no incomes are returned
    }
}

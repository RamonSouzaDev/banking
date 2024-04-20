<?php

namespace Tests\Feature;

use Mockery;
use Tests\TestCase;
use App\Models\User;
use App\Models\CheckDeposit;
use App\Models\AccountBalance;
use Illuminate\Http\UploadedFile;
use App\Services\TransactionService;
use App\Traits\InteractsWithPassport;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TransactionControllerTest extends TestCase
{
    use RefreshDatabase, InteractsWithPassport;

    /** @test */
    public function it_handles_deposit_validation_failure()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $response = $this->postJson(route('transactions.deposit'), [
            'amount' => 'invalid',
            'description' => 'Initial deposit',
        ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function it_processes_purchase_successfully()
    {
        $user = User::factory()->has(AccountBalance::factory()->state(['balance' => 1000]))->create();
        $this->actingAs($user, 'api');

        $response = $this->postJson(route('transactions.purchase'), [
            'amount' => 200,
            'description' => 'Grocery shopping'
        ]);

        $response->assertStatus(200);
        $response->assertJson(['message' => 'Purchase successful']);
        $this->assertEquals(800, $user->accountBalance->fresh()->balance);
    }

    /** @test */
    public function it_handles_insufficient_funds()
    {
        $user = User::factory()->has(AccountBalance::factory()->state(['balance' => 100]))->create();
        $this->actingAs($user, 'api');

        $response = $this->postJson(route('transactions.purchase'), [
            'amount' => 200,
            'description' => 'Grocery shopping'
        ]);

        $response->assertStatus(400);
        $response->assertJson(['error' => 'Insufficient funds']);
    }

    /** @test */
    public function it_retrieves_user_balance()
    {
        $user = User::factory()->has(AccountBalance::factory()->state(['balance' => 500]))->create();
        $this->actingAs($user, 'api');

        $response = $this->getJson(route('transactions.getBalance'));

        $response->assertStatus(200);
        $response->assertJson([
            'balance' => 500,
            'income' => 0,
            'expenses' => 0
        ]);
    }

    /** @test */
    public function it_lists_user_transactions()
    {
        $user = User::factory()->hasTransactions(5)->create();
        $this->actingAs($user, 'api');

        $response = $this->getJson(route('transactions.index'));

        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
    }

    /** @test */
    public function it_retrieves_all_user_checks()
    {
        $user = User::factory()->create();
        CheckDeposit::factory()->count(10)->for($user)->create();
        $this->actingAs($user, 'api');

        $response = $this->getJson(route('transactions.getChecks'));

        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => []]);
        $response->assertJsonCount(5, 'data'); 
    }

    /** @test */
    public function it_filters_checks_by_status()
    {
        $user = User::factory()->create();
        CheckDeposit::factory()->count(5)->for($user)->create(['status' => 'pending']);
        CheckDeposit::factory()->count(5)->for($user)->create(['status' => 'approved']);
        $this->actingAs($user, 'api');

        $response = $this->getJson(route('transactions.getChecks') . '?status=pending');

        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
        $response->assertJsonPath('data.0.status', 'pending');
    }

    /** @test */
    public function it_filters_checks_by_month()
    {
        $user = User::factory()->create();
        CheckDeposit::factory()->for($user)->create([
            'created_at' => now()->subMonth(),
            'status' => 'pending'
        ]);
        CheckDeposit::factory()->for($user)->create([
            'created_at' => now(),
            'status' => 'approved'
        ]);
        $this->actingAs($user, 'api');

        $response = $this->getJson(route('transactions.getChecks') . '?month=' . now()->format('Y-m'));

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data'); // Only checks from the current month are returned
    }

    /** @test */
    public function it_handles_pagination()
    {
        $user = User::factory()->create();
        CheckDeposit::factory()->count(15)->for($user)->create(['status' => 'pending']);
        $this->actingAs($user, 'api');

        $response = $this->getJson(route('transactions.getChecks') . '?perPage=10');

        $response->assertStatus(200);
        $response->assertJsonCount(10, 'data'); // Checks that pagination respects the 'perPage' request parameter
    }

    /** @test */
    public function it_lists_pending_deposits_correctly()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        CheckDeposit::factory()->count(5)->for($user)->state(['status' => 'pending'])->create();
        CheckDeposit::factory()->count(3)->for($user)->state(['status' => 'approved'])->create();

        $response = $this->getJson(route('admin.check-deposits.pending'));

        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
        foreach ($response->json('data') as $deposit) {
            $this->assertEquals('pending', $deposit['status']);
        }
    }

    /** @test */
    public function it_paginates_list_of_pending_deposits_correctly()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        CheckDeposit::factory()->count(15)->for($user)->state(['status' => 'pending'])->create();

        $response = $this->getJson(route('admin.check-deposits.pending') . '?perPage=10');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => ['*' => ['id', 'status', 'amount', 'description']],
            'links',
        ]);
        $response->assertJsonCount(10, 'data');
    }

    /** @test */
    public function it_paginates_pending_check_deposits_correctly()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        CheckDeposit::factory()->count(15)->for($user)->state(['status' => 'pending'])->create();

        $service = new TransactionService();
        $pendingDeposits = $service->getPendingCheckDeposits(10);  // Setting up pagination

        $this->assertEquals(10, $pendingDeposits->count());  // First page should have 10 items
        $this->assertEquals(2, $pendingDeposits->lastPage());  // Ensure there are two pages
    }
}

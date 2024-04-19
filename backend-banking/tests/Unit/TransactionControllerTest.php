<?php

namespace Tests\Unit;

use App\Http\Controllers\Api\TransactionController;
use App\Models\CheckDeposit;
use App\Models\User;
use App\Services\TransactionService;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Mockery;
use Tests\TestCase;

class TransactionControllerTest extends TestCase
{
    private $controller;
    private $serviceMock;

    protected function setUp(): void
    {
        parent::setUp();
        $this->serviceMock = Mockery::mock(TransactionService::class);
        $this->controller = new TransactionController($this->serviceMock);
    }

    /** @test */
    public function it_returns_pending_check_deposits()
    {
        $user = User::first();
        $this->actingAs($user);
        $deposit = CheckDeposit::create(['status' => 'pending', 'user_id' => $user->id, 'picture' => 'path/to/check.jpg', 'amount' => 100, 'description' => 'Sample deposit']);

        $response = $this->get('/api/admin/check-deposits/pending');

        $response->assertStatus(302);
        
    }

    protected function tearDown(): void
    {
        Mockery::close();
    }
}

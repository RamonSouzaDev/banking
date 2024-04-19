<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\TransactionService;
use App\Models\User;
use Mockery;

class TransactionServiceTest extends TestCase
{
    private $service;
    private $userMock;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new TransactionService();
        $this->userMock = Mockery::mock(User::class);
    }

    public function testDeposit()
    {
        $this->userMock->shouldReceive('checkDeposits->create')
            ->once()
            ->andReturn((object)['id' => 1, 'status' => 'pending']);

        $result = $this->service->deposit($this->userMock, 100, 'Sample deposit', 'path/to/check.jpg');

        $this->assertTrue(property_exists($result, 'id'));

        $this->assertEquals('pending', $result->status);
    }

    protected function tearDown(): void
    {
        Mockery::close();
    }
}

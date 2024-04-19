<?php

namespace App\Traits;

use App\Models\User;
use Laravel\Passport\Passport;

trait InteractsWithPassport
{
    /**
     * Autentica um usuário usando Passport.
     *
     * @param \App\Models\User|null $user
     * @return \App\Models\User
     */
    protected function authenticateUser(User $user = null): User
    {
        $user = $user ?: User::factory()->create();

        Passport::actingAs($user);

        return $user;
    }
}

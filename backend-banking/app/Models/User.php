<?php

namespace App\Models;

use App\Models\AccountBalance;
use App\Models\CheckDeposit;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'zip_code',
        'state',
        'city',
        'address',
        'address_number',
        'address_complement',
        'neighborhood',
        'phone',
        'cellphone',
        'group_id',
        'status',
        'profile_image',
        'birth_date',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getBalanceAttribute()
    {
        return $this->accountBalance->balance ?? 0;
    }

    /**
     * User transactions relationship.
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * User check deposits relationship.
     */
    public function checkDeposits()
    {
        return $this->hasMany(CheckDeposit::class);
    }

    /**
     * Relationship with the account balance.
     */
    public function accountBalance()
    {
        return $this->hasOne(AccountBalance::class);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Group;
use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {


        // Usuário Admin
        $adminUser = User::create([
            'name' => 'User Admin',
            'email' => 'admin@banking.com',
            'password' => Hash::make('senha'),
            'zip_code' => '12345-678',
            'state' => 'SP',
            'city' => 'São Paulo',
            'address' => 'Rua Exemplo',
            'address_number' => '123',
            'address_complement' => 'Apto 101',
            'neighborhood' => 'Bairro Exemplo',
            'phone' => '123456789',
            'cellphone' => '987654321',
            'status' => 'ativo',
        ]);

        // Usuário TI
        $tiUser = User::create([
            'name' => 'User TI',
            'email' => 'ti@example.com',
            'password' => Hash::make('senha'),
            'zip_code' => '54321-876',
            'state' => 'RJ',
            'city' => 'Rio de Janeiro',
            'address' => 'Rua Teste',
            'address_number' => '456',
            'address_complement' => 'Apto 202',
            'neighborhood' => 'Bairro Teste',
            'phone' => '987654321',
            'cellphone' => '123456789',
            'status' => 'ativo',
        ]);

        // Usuário Financeiro
        $financeiroUser = User::create([
            'name' => 'User Finance',
            'email' => 'financeiro@example.com',
            'password' => Hash::make('senha'),
            'zip_code' => '98765-432',
            'state' => 'MG',
            'city' => 'Belo Horizonte',
            'address' => 'Rua Exemplo Financeiro',
            'address_number' => '789',
            'address_complement' => 'Apto 303',
            'neighborhood' => 'Bairro Financeiro',
            'phone' => '567890123',
            'cellphone' => '012345678',
            'status' => 'ativo',
        ]);
    }
}

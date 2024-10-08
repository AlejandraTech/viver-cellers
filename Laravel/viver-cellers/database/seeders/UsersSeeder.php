<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Seeder class inserting the initial data of the table users
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'admin',
                'dni' => null,
                'lastname' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('Aa12345678.'),
                'rol' => 'admin',
                'address' => null,
                'project_id_fk' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'nurseryman',
                'dni' => null,
                'lastname' => 'nurseryman',
                'email' => 'nurseryman1@gmail.com',
                'password' => Hash::make('Aa12345678.'),
                'rol' => 'nurseryman',
                'address' => null,
                'project_id_fk' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'nurserymann',
                'dni' => null,
                'lastname' => 'nurserymann',
                'email' => 'nurseryman2@gmail.com',
                'password' => Hash::make('Aa12345678.'),
                'rol' => 'nurseryman',
                'address' => null,
                'project_id_fk' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'client',
                'dni' => null,
                'lastname' => 'client',
                'email' => 'client1@gmail.com',
                'password' => Hash::make('Aa12345678.'),
                'rol' => 'client',
                'address' => null,
                'project_id_fk' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'clientt',
                'dni' => null,
                'lastname' => 'clientt',
                'email' => 'client2@gmail.com',
                'password' => Hash::make('Aa12345678.'),
                'rol' => 'client',
                'address' => null,
                'project_id_fk' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('users')->insert($data);
    }
}

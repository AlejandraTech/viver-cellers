<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Seeder class inserting the initial data of the table types_variet
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeVarietySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('types_variet')->insert([
            'variety' => 'Xarel·lo',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('types_variet')->insert([
            'variety' => 'Chardonnay',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('types_variet')->insert([
            'variety' => 'Montònega',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('types_variet')->insert([
            'variety' => 'Macabeu',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('types_variet')->insert([
            'variety' => 'Merlot y Xarel·lo',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('types_variet')->insert([
            'variety' => 'Merlot',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('types_variet')->insert([
            'variety' => 'Parellada',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

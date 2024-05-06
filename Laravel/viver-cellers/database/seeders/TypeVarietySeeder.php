<?php

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
    }
}

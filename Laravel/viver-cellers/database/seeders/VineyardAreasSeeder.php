<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VineyardAreasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['area' => 'Castellet i la Gornal'],
            ['area' => 'Pla de Manlleu'],
        ];

        DB::table('vineyard_areas')->insert($data);
    }
}

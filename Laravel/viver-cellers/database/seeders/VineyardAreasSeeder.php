<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Seeder class inserting the initial data of the table vineyard_areas
 */

namespace Database\Seeders;

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
            ['area' => 'Parc natural d’Olèrdola'],
            ['area' => 'Turons de Vilafranca'],
            ['area' => 'Guardiola de Font-Rubí'],
        ];

        DB::table('vineyard_areas')->insert($data);
    }
}

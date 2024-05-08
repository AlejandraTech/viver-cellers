<?php
/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Seeder class inserting the initial data of the table types_wine
 */
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeWineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('types_wine')->insert([
            'category' => 'Blanc',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('types_wine')->insert([
            'category' => 'Escumós rosat',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

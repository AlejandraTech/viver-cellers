<?php
/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Seeder class inserting the initial data of the table order_statuses
 */
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('order_statuses')->insert([
            ['name' => 'Pendent de pagament', 'description' => 'El client encara no ha completat el pagament per l’ordre.'],
            ['name' => 'Pagament rebut', 'description' => 'El pagament per l’ordre ha estat rebut i confirmat.'],
            ['name' => 'En procés de preparació', 'description' => 'L’ordre està preparant-se per al seu enviament.'],
            ['name' => 'En camí', 'description' => 'L’ordre ha estat enviada i està en camí cap a l’adreça del client.'],
            ['name' => 'Lliurat', 'description' => 'L’ordre ha estat lliurada amb èxit al client.'],
            ['name' => 'Cancel·lat', 'description' => 'L’ordre ha estat cancel·lada per alguna raó, com a sol·licitud del client o problemes d’inventari.'],
        ]);
    }
}

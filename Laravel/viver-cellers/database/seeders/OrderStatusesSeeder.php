<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            ['name' => 'Pendiente de pago', 'description' => 'El cliente aún no ha completado el pago por la orden.'],
            ['name' => 'Pago recibido', 'description' => 'El pago por la orden ha sido recibido y confirmado.'],
            ['name' => 'En proceso de preparación', 'description' => 'La orden está siendo preparada para su envío.'],
            ['name' => 'En camino', 'description' => 'La orden ha sido enviada y está en camino hacia la dirección del cliente.'],
            ['name' => 'Entregado', 'description' => 'La orden ha sido entregada con éxito al cliente.'],
            ['name' => 'Cancelado', 'description' => 'La orden ha sido cancelada por alguna razón, como solicitud del cliente o problemas de inventario.'],
        ]);
    }
}

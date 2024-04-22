<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_statuses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description');
            $table->timestamps();
        });


        // Insertar los estados de orden iniciales
        DB::table('order_statuses')->insert([
            ['name' => 'Pendiente de pago', 'description' => 'El cliente aún no ha completado el pago por la orden.'],
            ['name' => 'Pago recibido', 'description' => 'El pago por la orden ha sido recibido y confirmado.'],
            ['name' => 'En proceso de preparación', 'description' => 'La orden está siendo preparada para su envío.'],
            ['name' => 'En camino', 'description' => 'La orden ha sido enviada y está en camino hacia la dirección del cliente.'],
            ['name' => 'Entregado', 'description' => 'La orden ha sido entregada con éxito al cliente.'],
            ['name' => 'Cancelado', 'description' => 'La orden ha sido cancelada por alguna razón, como solicitud del cliente o problemas de inventario.'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_statuses');
    }
};

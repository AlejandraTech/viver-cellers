<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('id_product_fk');
            $table->foreign('id_product_fk')->references('id')->on('products');
            $table->date('date_order');
            $table->date('deliver_date');
            $table->integer('amount');
            $table->unsignedInteger('id_user_fk');
            $table->foreign('id_user_fk')->references('id')->on('users');
            $table->unsignedInteger('order_status_id');
            $table->foreign('order_status_id')->references('id')->on('order_statuses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

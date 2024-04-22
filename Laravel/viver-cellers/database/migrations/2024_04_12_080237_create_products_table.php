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
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('id_vineyard_area_fk');
            $table->foreign('id_vineyard_area_fk')->references('id')->on('vineyard_areas');
            $table->string('name');
            $table->string('winemaking');
            $table->string('vineyard_area');
            $table->integer('grade_alcohol');
            $table->decimal('price', 8, 2);
            $table->integer('iva');
            $table->unsignedInteger('project_id')->nullable();
            $table->foreign('project_id')->references('id')->on('projects');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

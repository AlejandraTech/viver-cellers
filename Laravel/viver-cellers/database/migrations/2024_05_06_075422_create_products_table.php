<?php
/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Migration to create the products table and all its fields
 */
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
            $table->unsignedInteger('id_vineyard_area_fk'); //foreign key of the table vineyard_areas
            $table->foreign('id_vineyard_area_fk')->references('id')->on('vineyard_areas');
            $table->string('image_path')->nullable();
            $table->string('name');
            $table->string('winemaking');
            $table->decimal('grade_alcohol', 8, 2);
            $table->integer('stock');
            $table->decimal('price', 8, 2);
            $table->integer('iva');
            $table->unsignedInteger('id_type_wine_fk')->nullable(); // foreign key of the table types_wine
            $table->foreign('id_type_wine_fk')->references('id')->on('types_wine');
            $table->unsignedInteger('id_type_variety_fk')->nullable(); // foreign key of the table types_variet
            $table->foreign('id_type_variety_fk')->references('id')->on('types_variet');
            $table->unsignedInteger('project_id')->nullable(); // foreign key of the table projects
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

<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Model class that allows interacting (performing queries and CRUD operations) with the vineyard_areas table.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VineyardArea extends Model
{
    use HasFactory;

    protected $table = 'vineyard_areas'; //Specify table name because it doesn't follow Laravel conventions


    // Array containing the fields that can be assigned with a value from the application
    protected $fillable = [
        'area',
    ];

    /**
     * The relationship 1:N is defined with the table products
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'id_vineyard_area_fk');
    }
}

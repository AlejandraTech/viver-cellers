<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Model class that allows interacting (performing queries and CRUD operations) with the types_variet table.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeVariety extends Model
{
    use HasFactory;

    // Array containing the fields that can be assigned with a value from the application
    protected $fillable = [
        'variety',
    ];

    protected $table = 'types_variet'; //Specify table name because it doesn't follow Laravel conventions

    /**
     * The relationship 1:N is defined with the table products
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'id_type_variety_fk');
    }
}

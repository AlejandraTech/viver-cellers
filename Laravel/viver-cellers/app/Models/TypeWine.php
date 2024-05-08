<?php
/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Model class that allows interacting (performing queries and CRUD operations) with the types_wine table.
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeWine extends Model
{
    use HasFactory;

    // Array containing the fields that can be assigned with a value from the application
    protected $fillable = [
        'category',
    ];

    protected $table = 'types_wine'; //Specify table name because it doesn't follow Laravel conventions

    /**
     * The relationship 1:N is defined with the table products
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'id_type_wine_fk');
    }
}

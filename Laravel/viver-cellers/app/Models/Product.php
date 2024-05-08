<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Model class that allows interacting (performing queries and CRUD operations) with the products table.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Array containing the fields that can be assigned with a value from the application
    protected $fillable = [
        'id_vineyard_area_fk',
        'name',
        'winemaking',
        'grade_alcohol',
        'stock',
        'price',
        'iva',
        'id_type_wine_fk',
        'id_type_variety_fk',
        'project_id',
    ];

    /**
     * The relationship 1:N is defined with the table vineyard_areas
     */
    public function vineyardArea()
    {
        return $this->belongsTo(VineyardArea::class, 'id_vineyard_area_fk');
    }

    /**
     * The relationship 1:N is defined with the table types_wine
     */
    public function typeWine()
    {
        return $this->belongsTo(TypeWine::class, 'id_type_wine_fk');
    }

    /**
     * The relationship 1:N is defined with the table types_variet
     */
    public function typeVariety()
    {
        return $this->belongsTo(TypeVariety::class, 'id_type_variety_fk');
    }

    /**
     * The relationship 1:N is defined with the table projects
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * The relationship N:M is defined with the table orders
     */
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_lines', 'id_product_fk', 'id_order_fk');
    }
}

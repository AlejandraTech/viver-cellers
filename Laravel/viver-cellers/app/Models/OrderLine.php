<?php
/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Model class that allows interacting (performing queries and CRUD operations) with the order_lines table.
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderLine extends Model
{
    use HasFactory;

    //array containing the fields that can be assigned with a value from the application
    protected $fillable = [
        'id_order_fk',
        'id_product_fk',
        'quantity',
    ];

    /**
     * The relationship N:M is defined with the table orders
     */
    public function order()
    {
        return $this->belongsTo(Order::class, 'id_order_fk');
    }

    /**
     * The relationship N:M is defined with the table products
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product_fk');
    }
}

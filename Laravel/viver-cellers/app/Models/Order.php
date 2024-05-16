<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Model class that allows interacting (performing queries and CRUD operations) with the orders table.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Array containing the fields that can be assigned with a value from the application
    protected $fillable = [
        'id_user_fk',
        'price',
        'address',
        'payment_token',
        'order_status_id',
        'created_at',
        'updated_at'
    ];

    /**
     * The relationship 1:N is defined with the table users
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user_fk');
    }

    /**
     * The relationship 1:N is defined with the table order_statuses
     */
    public function status()
    {
        return $this->belongsTo(OrderStatus::class, 'order_status_id');
    }

    public function orderLines()
    {
        return $this->hasMany(OrderLine::class, 'id_order_fk');
    }
}

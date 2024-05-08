<?php
/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Model class that allows interacting (performing queries and CRUD operations) with the order_statuses table.
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    use HasFactory;

    // Array containing the fields that can be assigned with a value from the application
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * The relationship 1:N is defined with the table products
     */
    public function orders()
    {
        return $this->hasMany(Order::class, 'order_status_id');
    }
}

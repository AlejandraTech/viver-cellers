<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderLine extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_order_fk',
        'id_product_fk',
        'quantity',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'id_order_fk');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product_fk');
    }
}

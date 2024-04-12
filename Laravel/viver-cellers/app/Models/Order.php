<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['id_product_fk', 'date_order', 'deliver_date', 'amount', 'id_user_fk', 'order_status_id'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product_fk');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user_fk');
    }

    public function orderStatus()
    {
        return $this->belongsTo(OrderStatus::class, 'order_status_id');
    }

    public function orderLines()
    {
        return $this->hasMany(OrderLine::class, 'id_order_fk');
    }
}

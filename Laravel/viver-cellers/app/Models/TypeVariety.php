<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeVariety extends Model
{
    use HasFactory;

    protected $fillable = ['id_product_fk', 'variety'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product_fk');
    }
}

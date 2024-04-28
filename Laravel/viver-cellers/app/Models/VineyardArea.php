<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VineyardArea extends Model
{
    use HasFactory;

    protected $fillable = [
        'area',
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'id_vineyard_area_fk');
    }
}

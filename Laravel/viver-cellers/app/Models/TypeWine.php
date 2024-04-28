<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeWine extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'id_type_wine_fk');
    }
}

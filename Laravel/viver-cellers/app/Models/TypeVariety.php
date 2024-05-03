<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeVariety extends Model
{
    use HasFactory;

    protected $fillable = [
        'variety',
    ];

    protected $table = 'types_variet';

    public function products()
    {
        return $this->hasMany(Product::class, 'id_type_variety_fk');
    }
}

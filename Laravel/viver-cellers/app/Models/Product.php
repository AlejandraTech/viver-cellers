<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

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

    public function vineyardArea()
    {
        return $this->belongsTo(VineyardArea::class, 'id_vineyard_area_fk');
    }

    public function typeWine()
    {
        return $this->belongsTo(TypeWine::class, 'id_type_wine_fk');
    }

    public function typeVariety()
    {
        return $this->belongsTo(TypeVariety::class, 'id_type_variety_fk');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'id_product_fk');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['id_vineyard_area_fk', 'name', 'winemaking', 'vineyard_area', 'grade_alcohol', 'price', 'iva', 'project_id'];

    public function vineyardArea()
    {
        return $this->belongsTo(VineyardArea::class, 'id_vineyard_area_fk');
    }

    public function typeWines()
    {
        return $this->hasMany(TypeWine::class, 'id_product_fk');
    }

    public function typeVarieties()
    {
        return $this->hasMany(TypeVariety::class, 'id_product_fk');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}

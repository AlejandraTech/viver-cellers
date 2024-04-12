<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'postal_code'];

    public function users()
    {
        return $this->hasMany(User::class, 'id_province_fk');
    }
}

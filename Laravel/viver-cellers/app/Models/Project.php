<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['id_user_fk', 'project_name', 'definition', 'description', 'stories'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user_fk');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'project_id');
    }
}

<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = ['id_province_fk', 'name', 'dni', 'lastname', 'email', 'password', 'rol'];

    public function province()
    {
        return $this->belongsTo(Province::class, 'id_province_fk');
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'id_user_fk');
    }
}

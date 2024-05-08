<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Model class that allows interacting (performing queries and CRUD operations) with the users table.
 */

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Array containing the fields that can be assigned with a value from the application
    protected $fillable = [
        'name',
        'dni',
        'lastname',
        'email',
        'rol',
        'password',
    ];

    // The attributes that should be hidden for serialization.
    protected $hidden = [
        'password',
        'remember_token',
    ];

    //The attributes that should be cast.
    protected $casts = [
        // 'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * The relationship 1:N is defined with the table projects
     */
    public function projects()
    {
        return $this->belongsToMany(Project::class)->where('rol', 'nurseryman');
    }
}

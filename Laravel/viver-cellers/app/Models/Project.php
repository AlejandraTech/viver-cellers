<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Model class that allows interacting (performing queries and CRUD operations) with the projects table.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    // Array containing the fields that can be assigned with a value from the application
    protected $fillable = [
        'project_name',
        'definition',
        'description',
        'stories',
        'logo_path',
    ];

    /**
     * The relationship 1:N is defined with the table users
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * The relationship 1:N is defined with the table products
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}

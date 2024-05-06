<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(VineyardAreasSeeder::class);
        $this->call(ProjectsSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(TypeWineSeeder::class);
        $this->call(TypeVarietySeeder::class);
        $this->call(ProductsSeeder::class);
        $this->call(OrderStatusesSeeder::class);
    }
}

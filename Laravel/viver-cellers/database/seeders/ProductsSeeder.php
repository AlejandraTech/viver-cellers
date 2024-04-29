<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id_vineyard_area_fk' => 2,
                'name' => 'El Tiet',
                'image_path' => 'assets/img/products/joan-grill/el-tiet.jpg',
                'winemaking' => 'Ecològica respectant i expressant la varietat',
                'grade_alcohol' => 13,
                'stock' => 100,
                'price' => 17.50,
                'iva' => 21,
                'project_id' => 1,
                'id_type_wine_fk' => 1,
                'id_type_variety_fk' => 2,
            ],
            [
                'id_vineyard_area_fk' => 2,
                'name' => 'El Journal',
                'image_path' => 'assets/img/products/joan-grill/el-Jornal.jpg',
                'winemaking' => 'Ecològica respectant i expressant la varietat',
                'grade_alcohol' => 11.5,
                'stock' => 100,
                'price' => 19.70,
                'iva' => 21,
                'project_id' => 1,
                'id_type_wine_fk' => 1,
                'id_type_variety_fk' => 3,
            ],
            [
                'id_vineyard_area_fk' => 1,
                'name' => 'GÈNIU XAREL.LO BRISAT 2023',
                'image_path' => 'assets/img/products/geniu/brisat.jpg',
                'winemaking' => 'Brisat de mínima intervenció, pigeage manual i fermentació amb les pròpies pells.',
                'grade_alcohol' => 10.50,
                'stock' => 100,
                'price' => 19.60,
                'iva' => 21,
                'project_id' => 2,
                'id_type_wine_fk' => 1,
                'id_type_variety_fk' => 1,
            ],
        ];

        DB::table('products')->insert($data);
    }
}

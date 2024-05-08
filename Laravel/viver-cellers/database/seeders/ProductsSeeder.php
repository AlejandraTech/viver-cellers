<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Seeder class inserting the initial data of the table products
 */

namespace Database\Seeders;

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
            [
                'id_vineyard_area_fk' => 3,
                'name' => 'L’ancestral 2023',
                'image_path' => 'assets/img/products/mulet-viticultors/ancestral.jpg',
                'winemaking' => 'Escumós elaborat pel mètode ancestral',
                'grade_alcohol' => 12,
                'stock' => 100,
                'price' => 16,
                'iva' => 21,
                'project_id' => 3,
                'id_type_wine_fk' => 2,
                'id_type_variety_fk' => 5,
            ],
            [
                'id_vineyard_area_fk' => 3,
                'name' => 'Xarel·lo 2023',
                'image_path' => 'assets/img/products/mulet-viticultors/xarello.jpg',
                'winemaking' => 'Fermentació espontània i mínima intervenció',
                'grade_alcohol' => 13,
                'stock' => 100,
                'price' => 14,
                'iva' => 21,
                'project_id' => 3,
                'id_type_wine_fk' => 1,
                'id_type_variety_fk' => 1,
            ],
            [
                'id_vineyard_area_fk' => 4,
                'name' => 'Macabeu 2023',
                'image_path' => 'assets/img/products/mulet-viticultors/macabeu.jpg',
                'winemaking' => 'Fermentació espontània i mínima intervenció',
                'grade_alcohol' => 13.5,
                'stock' => 100,
                'price' => 12,
                'iva' => 21,
                'project_id' => 3,
                'id_type_wine_fk' => 1,
                'id_type_variety_fk' => 4,
            ],
            [
                'id_vineyard_area_fk' => 5,
                'name' => 'Xarel·lo Heretat Baltà de Cela',
                'image_path' => 'assets/img/products/heretat-balta-cela/xarelo-heretat.jpg',
                'winemaking' => 'Ecològica, buscant l’essència més pura de la varietat Xarel·lo',
                'grade_alcohol' => 11.5,
                'stock' => 100,
                'price' => 16,
                'iva' => 21,
                'project_id' => 4,
                'id_type_wine_fk' => 1,
                'id_type_variety_fk' => 1,
            ],
            [
                'id_vineyard_area_fk' => 5,
                'name' => 'Parellada Heretat Baltà de Cela',
                'image_path' => 'assets/img/products/heretat-balta-cela/parellada-heretat.jpg',
                'winemaking' => 'Ecològica, buscant l’essència més pura de la varietat Parellada',
                'grade_alcohol' => 11.5,
                'stock' => 100,
                'price' => 15,
                'iva' => 21,
                'project_id' => 4,
                'id_type_wine_fk' => 1,
                'id_type_variety_fk' => 7,
            ],
        ];

        DB::table('products')->insert($data);
    }
}

<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * This controller manages operations related to listing, adding, modifying and deleting products.
 */

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\TypeWine;
use App\Models\VineyardArea;
use App\Models\TypeVariety;
use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

     /**
     * Display a listing of the categories.
     * @return \Illuminate\Http\Response
     */
    public function indexCategory()
    {
        $categories = TypeWine::all();
            return response()->json($categories);
    }

    /**
     * Display a listing of the varieties.
     * @return \Illuminate\Http\Response
     */
    public function indexVariety()
    {
        $varieties = TypeVariety::all();
        return response()->json($varieties);
    }

    /**
     * Collect all the fields of a specific product.
     * @param $id product id field
     */
    public function showProduct($id)
    {
        $products = Product::with('project', 'typeWine', 'TypeVariety')->find($id);
        return response()->json($products, 200);
    }

    /**
     * Get the list of all product with the project and the associated category, variety and area
     * @return - Api response
     */
    function getAll()
    {
        try {
            $data = Product::with('project', 'typeWine', 'TypeVariety', 'VineyardArea')->get();
            return ApiResponse::success('List of products', 200, $data);
        } catch (Exception $e) {
            return ApiResponse::error('Error to get the list of products ' . $e->getMessage(), 500);
        }
    }

    /**
     * Store a new product in the database
     * @param $request contains the data sent by the client to the server
     */
    public function store(Request $request)
    {
        try {
            // Initial validations
            $request->validate([
                'name' => 'required|string|min:2|max:50',
                'winemaking' => 'required|string||min:2|max:255',
                'grade_alcohol' => 'required|numeric|min:0|decimal:2',
                'stock' => 'required|numeric|min:0',
                'price' => 'required|numeric|min:0|decimal:2',
                'iva' => 'required|numeric|min:0',
                'project_name' => 'required',
                'vineyard_area' => 'required|string|min:2|max:150',
                'type_wine' => 'required|string|min:2|max:150',
                'type_variety' => 'required|string|min:2|max:150',
            ]);

            // Add or find the vineyard area
            $vineyardArea = VineyardArea::firstOrCreate([
                'area' => $request->input('vineyard_area')
            ]);

            // Add or find the type of wine
            $typeWine = TypeWine::firstOrCreate([
                'category' => $request->input('type_wine')
            ]);

            // Add or find the type of variety
            $typeVariety = TypeVariety::firstOrCreate([
                'variety' => $request->input('type_variety')
            ]);

            // Create the product with relationships
            $product = Product::create([
                'name' => $request->input('name'),
                'winemaking' => $request->input('winemaking'),
                'grade_alcohol' => $request->input('grade_alcohol'),
                'stock' => $request->input('stock'),
                'price' => $request->input('price'),
                'iva' => $request->input('iva'),
                'project_id' => $request->input('project_name'),
                'id_vineyard_area_fk' => $vineyardArea->id,
                'id_type_wine_fk' => $typeWine->id,
                'id_type_variety_fk' => $typeVariety->id,
            ]);

            return ApiResponse::success('Product created successfully', 200, $product);
        } catch (ValidationException $e) {
            return ApiResponse::error('Error creating the product: ' . $e->getMessage(), 422);
        } catch (Exception $e) {
            return ApiResponse::error('Error creating the product: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Update the information of an existing product in the database.
     * @param $request contains the data sent by the client to the server
     * @param $id product id field
     */
    function update(Request $request, $id)
    {
        try {
            // Search the product in the database by product ID
            $product = Product::findOrFail($id);

            // Initial validations
            $request->validate([
                'name' => 'required|string|max:255',
                'winemaking' => 'required|string|max:255',
                'grade_alcohol' => 'required|integer|min:0',
                'stock' => 'required|numeric|min:0',
                'price' => 'required|numeric|min:0',
                'iva' => 'required|integer|min:0',
                'project_name' => 'required',
                'vineyard_area' => 'required|string|max:255',
                'type_wine' => 'required|string|max:255',
                'type_variety' => 'required|string|max:255',
            ]);

            // Add or find vineyard area
            $vineyardArea = VineyardArea::firstOrCreate([
                'area' => $request->input('vineyard_area')
            ]);

            // Add or find the type of wine
            $typeWine = TypeWine::firstOrCreate([
                'category' => $request->input('type_wine')
            ]);

            // Add or find the type of variety
            $typeVariety = TypeVariety::firstOrCreate([
                'variety' => $request->input('type_variety')
            ]);

            // Update the product with the relationships
            $product->update([
                'name' => $request->input('name'),
                'winemaking' => $request->input('winemaking'),
                'grade_alcohol' => $request->input('grade_alcohol'),
                'stock' => $request->input('stock'),
                'price' => $request->input('price'),
                'iva' => $request->input('iva'),
                'project_id' => $request->input('project_name'),
                'id_vineyard_area_fk' => $vineyardArea->id,
                'id_type_wine_fk' => $typeWine->id,
                'id_type_variety_fk' => $typeVariety->id,
            ]);

            return ApiResponse::success('Product updated successfully', 200, $product);
        } catch (ValidationException $e) {
            return ApiResponse::error('Error of validation: ' . $e->getMessage(), 422);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Product not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error of update the product: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Delete a product from the database.
     * @param $id product id field
     */
    function destroy($id)
    {

        try {
            // Search product in the database by product id
            $product = Product::findOrFail($id);
            // Delete the product
            $product->delete();
            return ApiResponse::success('Product deleted successfully', 200);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Product not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error of delete the product: ' . $e->getMessage(), 500);
        }
    }
}

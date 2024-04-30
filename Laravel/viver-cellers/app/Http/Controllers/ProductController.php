<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    /**
     * Muestra los detalles de una casilla en concreto
     */
    public function showProduct($id)
    {
        $products = Product::find($id);
        return response()->json($products, 200);
    }
}

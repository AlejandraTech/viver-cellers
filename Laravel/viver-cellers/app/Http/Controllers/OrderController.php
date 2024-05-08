<?php

namespace App\Http\Controllers;

use App\Models\Order;

class OrderController extends Controller
{
    public function userOrders()
    {
        $userId = auth()->id();
        $orders = Order::with(['status', 'user'])->where('id_user_fk', $userId)->get();

        return response()->json($orders);
    }
}

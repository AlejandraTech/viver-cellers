<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Order;
use App\Models\OrderLine;
use App\Models\OrderStatus;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderController extends Controller
{
    /**
     * Get the list of all orders with the user and the associated status
     * @return - Api response
     */
    public function userOrders()
    {
        $userId = auth()->id();
        $orders = Order::with(['status', 'user'])->where('id_user_fk', $userId)->get();

        return response()->json($orders);
    }

    /**
     * Get the list of all order_line with the order and product
     * @return - Api response
     */
    public function nurserymanOrders()
    {
        try {
            $user = auth()->user();
            $projectId = $user->project_id_fk;

            $orderLines = OrderLine::with(['order', 'product'])
                ->whereHas('product', function ($query) use ($projectId) {
                    $query->where('project_id', $projectId);
                })
                ->get();

            $orders = $orderLines->groupBy('order.id')->map(function ($orderLines) {
                $order = $orderLines->first()->order;
                return [
                    'id' => $order->id,
                    'name' => $order->user->name,
                    'address' => $order->address,
                    'price' => $order->price,
                    'order_status_id' => $order->status->name
                ];
            });

            return ApiResponse::success('List of orders by fk_order_id', 200, $orders->values()->all());
        } catch (Exception $e) {
            return ApiResponse::error('Error to get the list of orders: ' . $e->getMessage(), 500);
        }
    }
    // public function nurserymanOrders()
    // {
    //     try {
    //         $orderLines = OrderLine::with(['order'])->get();

    //         $orders = $orderLines->groupBy('order.id')->map(function ($orderLines) {
    //             $order = $orderLines->first()->order;
    //             return [
    //                 'id' => $order->id,
    //                 'name' => $order->user->name,
    //                 'address' => $order->address,
    //                 'price' => $order->price,
    //                 'order_status_id' => $order->status->name
    //             ];
    //         });

    //         return ApiResponse::success('List of orders by fk_order_id', 200, $orders->values()->all());
    //     } catch (Exception $e) {
    //         return ApiResponse::error('Error to get the list of orders: ' . $e->getMessage(), 500);
    //     }
    // }

    /**
     * Get details of a specific order including product names, quantities, and prices.
     * @param int $orderId
     * @return \Illuminate\Http\JsonResponse
     */
    public function showOrderDetails($orderId)
    {
        try {
            $order = Order::with(['orderLines.product'])->findOrFail($orderId);
            return ApiResponse::success('Order details retrieved successfully', 200, $order);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Order not found: ' . $e->getMessage(), 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error retrieving order details: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get all order statuses.
     * @return - Api response
     */
    public function getOrderStatuses()
    {
        $statuses = OrderStatus::all();
        return ApiResponse::success('List of order statuses', 200, $statuses);
    }

    /**
     * Update the order_status_id of an existing order in the database.
     * @param $request contains the data sent by the client to the server
     * @param $id order_line id field
     */
    public function updateOrderStatus(Request $request, $id)
    {
        try {
            $order = Order::findOrFail($id);
            $order->order_status_id = $request->input('status_id');
            $order->save();

            return ApiResponse::success('Order status updated successfully', 200, $order);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Order not found: ' . $e->getMessage(), 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error updating order status: ' . $e->getMessage(), 500);
        }
    }
}

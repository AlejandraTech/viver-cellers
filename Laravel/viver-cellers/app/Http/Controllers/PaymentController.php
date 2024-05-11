<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\SetupIntent;
use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Product;

class PaymentController extends Controller
{
    // Method to process the payment
    public function checkout(Request $request)
    {
        // Stripe API configuration
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // Start a database transaction
        DB::beginTransaction();
        try {
            // Check if the order total is greater than zero
            if ($request->total > 0) {
                // Create a payment intent to charge the customer
                $paymentIntent = PaymentIntent::create([
                    'amount' => $request->total * 100,
                    'currency' => 'eur',
                    'description' => 'Compra de vinos',
                    'payment_method_data' => [
                        'type' => 'card',
                        'card' => ['token' => $request->token]
                    ],
                    'confirm' => true,
                    'return_url' => 'http://localhost:4200/api/home'
                ]);

                // If payment is successful
                if ($paymentIntent->status === 'succeeded') {
                    // Create an order in the database
                    $order = $this->createOrder($request, $paymentIntent->id);
                    if ($order) {
                        // Update the stock of the purchased products
                        $this->updateProductStock($request->items);

                        // Commit the database transaction
                        DB::commit();
                        return response()->json(['success' => true, 'order_id' => $order->id]);
                    } else {
                        throw new \Exception("Error al crear el pedido en la base de datos.");
                    }
                } else {
                    throw new \Exception("El pago falló con estado: " . $paymentIntent->status);
                }
            } else {
                // If order total is zero, create a setup intent for payment method
                $setupIntent = SetupIntent::create([
                    'payment_method_data' => [
                        'type' => 'card',
                        'card' => ['token' => $request->token]
                    ],
                    'usage' => 'off_session',
                    'return_url' => 'http://localhost:4200/api/home'
                ]);

                // Commit the database transaction
                DB::commit();
                return response()->json(['success' => true, 'setup_intent_id' => $setupIntent->id]);
            }
        } catch (\Exception $e) {
            // Roll back the database transaction if there is an error
            DB::rollBack();
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    // Private method to create an order in the database
    private function createOrder($request, $paymentToken)
    {
        // Create a new order in the database
        $order = Order::create([
            'id_user_fk' => auth()->user()->id,
            'price' => $request->total,
            'address' => $request->address,
            'payment_token' => $paymentToken,
            'order_status_id' => 2,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // If order is created successfully, create corresponding order lines
        if ($order) {
            foreach ($request->items as $item) {
                OrderLine::create([
                    'id_order_fk' => $order->id,
                    'id_product_fk' => $item['id'],
                    'quantity' => $item['quantity']
                ]);
            }
            return $order;
        } else {
            return false;
        }
    }

    // Private method to update the stock of products
    private function updateProductStock($items)
    {
        foreach ($items as $item) {
            $product = Product::find($item['id']);
            if ($product) {
                $product->stock -= $item['quantity'];
                $product->save();
            }
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\SetupIntent;
use App\Models\Order;
use App\Models\OrderLine;

class PaymentController extends Controller
{
    public function checkout(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        DB::beginTransaction();  // Iniciar transacción de base de datos
        try {
            if ($request->total > 0) {
                $paymentIntent = PaymentIntent::create([
                    'amount' => $request->total * 100, // Convertir a centavos
                    'currency' => 'eur',
                    'description' => 'Compra de vinos',
                    'payment_method_data' => [
                        'type' => 'card',
                        'card' => ['token' => $request->token]
                    ],
                    'confirm' => true,
                    'return_url' => 'http://localhost:4200/api/home'  // URL a la que se redirige después del pago
                ]);

                if ($paymentIntent->status === 'succeeded') {
                    $order = $this->createOrder($request, $paymentIntent->id);
                    if ($order) {
                        DB::commit();  // Confirmar la transacción
                        return response()->json(['success' => true, 'order_id' => $order->id]);
                    } else {
                        throw new \Exception("Error creating order in the database.");
                    }
                } else {
                    throw new \Exception("Payment failed with status: " . $paymentIntent->status);
                }
            } else {
                $setupIntent = SetupIntent::create([
                    'payment_method_data' => [
                        'type' => 'card',
                        'card' => ['token' => $request->token]
                    ],
                    'usage' => 'off_session',
                    'return_url' => 'http://localhost:4200/api/home'  // URL para redirecciones después de configurar
                ]);

                DB::commit();  // Confirmar la transacción
                return response()->json(['success' => true, 'setup_intent_id' => $setupIntent->id]);
            }
        } catch (\Exception $e) {
            DB::rollBack();  // Revertir la transacción si hay error
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    private function createOrder($request, $paymentToken)
    {
        $order = Order::create([
            'id_user_fk' => auth()->user()->id,
            'price' => $request->total,
            'address' => $request->address,
            'payment_token' => $paymentToken,
            'order_status_id' => 2,
            'created_at' => now(),
            'updated_at' => now()
        ]);

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
}

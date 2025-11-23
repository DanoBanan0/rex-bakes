<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Dessert;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::guard('api')->user();
        if ($user->role == 'admin') {
            $orders = Order::with('items.dessert')->orderBy('created_at', 'desc')->get();
        } else {
            $orders = Order::with('items.dessert')->where('user_id', $user->id)->orderBy('created_at', 'desc')->get();
        }
        return response()->json($orders);
    }

    public function store(Request $request)
    {

        $request->validate([
            'items' => 'required|array',
            'items.*.dessert_id' => 'required|exists:desserts,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            DB::beginTransaction();

            $user = Auth::guard('api')->user();
            $total = 0;
            $whatsappMessage = "Hola, soy {$user->name}. Quiero realizar el siguiente pedido:\n\n";

            $order = Order::create([
                'user_id' => $user->id,
                'status' => 'pending',
                'total' => 0
            ]);

            foreach ($request->items as $item) {
                $dessert = Dessert::lockForUpdate()->find($item['dessert_id']);

                if ($dessert->stock < $item['quantity']) {
                    throw new \Exception("No hay suficiente stock para el postre: " . $dessert->name);
                }

                $dessert->stock -= $item['quantity'];
                $dessert->save();

                $subtotal = $dessert->price * $item['quantity'];
                $total += $subtotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'dessert_id' => $item['dessert_id'],
                    'quantity' => $item['quantity'],
                    'price' => $dessert->price,
                ]);

                $whatsappMessage .= "- {$item['quantity']}x {$dessert->name} ($" . number_format($subtotal, 2) . ")\n";
            }

            $order->total = $total;
            $order->save();

            $whatsappMessage .= "\n*Total a pagar: $" . number_format($total, 2) . "*";
            $whatsappMessage .= "\nPedido N#: " . $order->id;

            $phone = env('WHATSAPP_PHONE', '50370117772');

            $whatsappUrl = "https://wa.me/{$phone}?text=" . urlencode($whatsappMessage);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Pedido realizado correctamente',
                'order' => $order,
                'whatsapp_url' => $whatsappUrl
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Error al realizar el pedido',
                'message' => $e->getMessage()
            ], 400);
        }
    }
    public function show($id)
    {
        $order = Order::with('items.dessert')->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        if (Auth::guard('api')->user()->role !== 'admin' && Auth::guard('api')->user()->id !== $order->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($order);
    }

    public function update(Request $request, $id)
    {
        if (Auth::guard('api')->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled'
        ]);

        if ($request->status === 'cancelled' && $order->status !== 'cancelled') {
            foreach ($order->items as $item) {
                $dessert = $item->dessert;
                $dessert->stock += $item->quantity;
                $dessert->save();
            }
        }

        $order->status = $request->status;
        $order->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Order status updated',
            'data' => $order
        ]);
    }

    public function destroy($id)
    {
        // Solo admin puede borrar pedidos completamente
        if (Auth::guard('api')->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Al borrar, devolvemos el stock si el pedido no estaba ya cancelado
        if ($order->status !== 'cancelled') {
            foreach ($order->items as $item) {
                $dessert = $item->dessert;
                $dessert->stock += $item->quantity;
                $dessert->save();
            }
        }

        $order->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Order deleted successfully'
        ]);
    }
}

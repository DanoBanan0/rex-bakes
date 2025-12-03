<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_admin_can_view_all_orders()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);
        Order::factory()->count(3)->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/orders');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_authenticated_user_can_view_single_order()
    {
        $user = User::factory()->create();
        $token = auth('api')->login($user);
        $order = Order::factory()->create(['user_id' => $user->id]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson("/api/orders/{$order->id}");

        $response->assertStatus(200)
            ->assertJson([
                'id' => $order->id,
                'total' => $order->total,
            ]);
    }

    public function test_authenticated_user_can_create_order()
    {
        $user = User::factory()->create();
        $token = auth('api')->login($user);
        $dessert = \App\Models\Dessert::factory()->create(['stock' => 10, 'price' => 10]);

        $orderData = [
            'items' => [
                [
                    'dessert_id' => $dessert->id,
                    'quantity' => 2
                ]
            ]
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/orders', $orderData);

        $response->assertStatus(201);
        
        $this->assertDatabaseHas('orders', ['user_id' => $user->id]);
    }

    public function test_authenticated_admin_can_update_order()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);
        $order = Order::factory()->create();

        $updatedData = ['status' => 'completed'];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson("/api/orders/{$order->id}", $updatedData);

        $response->assertStatus(200)
            ->assertJsonFragment(['status' => 'completed']);

        $this->assertDatabaseHas('orders', ['id' => $order->id, 'status' => 'completed']);
    }

    public function test_authenticated_admin_can_delete_order()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);
        $order = Order::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson("/api/orders/{$order->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('orders', ['id' => $order->id]);
    }
}

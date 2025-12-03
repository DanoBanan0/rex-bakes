<?php

namespace Tests\Feature;

use App\Models\Dessert;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DessertTest extends TestCase
{
    use RefreshDatabase;

    public function test_anyone_can_view_desserts()
    {
        Dessert::factory()->count(3)->create();

        $response = $this->getJson('/api/desserts');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_anyone_can_view_single_dessert()
    {
        $dessert = Dessert::factory()->create();

        $response = $this->getJson("/api/desserts/{$dessert->id}");

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $dessert->id,
                    'name' => $dessert->name,
                ]
            ]);
    }

    public function test_authenticated_admin_can_create_dessert()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);

        $dessertData = [
            'name' => 'New Dessert',
            'description' => 'Delicious',
            'price' => 10.50,
            'stock' => 20,
            'image_path' => 'http://example.com/image.jpg',
            'image_url' => 'http://example.com/image.jpg',
            'is_active' => true,
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/desserts', $dessertData);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'New Dessert']);

        $this->assertDatabaseHas('desserts', ['name' => 'New Dessert']);
    }

    public function test_authenticated_admin_can_update_dessert()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);
        $dessert = Dessert::factory()->create();

        $updatedData = ['name' => 'Updated Name'];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson("/api/desserts/{$dessert->id}", $updatedData);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Updated Name']);

        $this->assertDatabaseHas('desserts', ['id' => $dessert->id, 'name' => 'Updated Name']);
    }

    public function test_authenticated_admin_can_delete_dessert()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);
        $dessert = Dessert::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson("/api/desserts/{$dessert->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('desserts', ['id' => $dessert->id]);
    }
}

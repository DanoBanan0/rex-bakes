<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_admin_can_view_users()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);
        User::factory()->count(2)->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/users');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_authenticated_admin_can_view_single_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);
        $otherUser = User::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson("/api/users/{$otherUser->id}");

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $otherUser->id,
                    'email' => $otherUser->email,
                ]
            ]);
    }

    public function test_authenticated_admin_can_update_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);
        $otherUser = User::factory()->create();

        $updatedData = ['name' => 'Updated Name'];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson("/api/users/{$otherUser->id}", $updatedData);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Updated Name']);

        $this->assertDatabaseHas('users', ['id' => $otherUser->id, 'name' => 'Updated Name']);
    }

    public function test_authenticated_admin_can_delete_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);
        $otherUser = User::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson("/api/users/{$otherUser->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('users', ['id' => $otherUser->id]);
    }
}

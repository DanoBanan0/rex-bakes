<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Dessert;
use Illuminate\Support\Facades\Storage;

class DessertController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Dessert::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('desserts', 'public');
            $imageUrl = asset('storage/' . $imagePath);
        }

        $dessert = Dessert::create([
            'name' => $request->name,
            'description' => $request->description,
            'stock' => $request->stock,
            'price' => $request->price,
            'image_path' => $imagePath ?? null,
            'image_url' => $imageUrl ?? null,
            'is_active' => true,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Dessert created successfully',
            'data' => $dessert
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $dessert = Dessert::find($id);

        if (!$dessert) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dessert not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $dessert
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $dessert = Dessert::find($id);

        if (!$dessert) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dessert not found'
            ], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric',
            'stock' => 'sometimes|required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->only(['name', 'description', 'price', 'stock']);

        if ($request->hasFile('image')) {
            // Eliminar imagen anterior si existe
            if ($dessert->image_path) {
                Storage::disk('public')->delete($dessert->image_path);
            }
            $path = $request->file('image')->store('desserts', 'public');
            $data['image_path'] = $path;
            $data['image_url'] = asset('storage/' . $path);
        }

        $dessert->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Dessert updated successfully',
            'data' => $dessert
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dessert = Dessert::find($id);

        if (!$dessert) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dessert not found'
            ], 404);
        }

        if ($dessert->image_path) {
            Storage::disk('public')->delete($dessert->image_path);
        }

        $dessert->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Dessert deleted successfully'
        ]);
    }
}

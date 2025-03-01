<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    /**
     * Store a new image.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'image' => 'required|file|mimes:svg,png|max:2048', // Max 2MB
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            DB::beginTransaction(); // Start a database transaction

            // Get the uploaded image
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();

            // Store the image in "storage/app/public/images"
            // $path = $image->storeAs('public/images', $filename);
            $path = $image->storeAs('images', $filename, 'public');


            // Save the image details in the database
            $imageModel = Image::create([
                'filename' => $filename,
                'mime_type' => $image->getClientMimeType(),
            ]);

            DB::commit(); // Commit the transaction

            // Generate the public URL for the image
            $imageUrl = asset('storage/images/' . $filename);

            return response()->json([
                'message' => 'Image uploaded successfully',
                'data' => [
                    'id' => $imageModel->id,
                    'filename' => $filename,
                    'url' => $imageUrl,
                    'mime_type' => $imageModel->mime_type,
                ],
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback the transaction in case of an error

            return response()->json([
                'message' => 'Failed to upload image',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show an image by ID.
     */
    public function show($id)
    {
        // Find the image by ID
        $image = Image::find($id);

        if (!$image) {
            return response()->json([
                'message' => 'Image not found',
            ], 404);
        }

        // Generate the public URL for the image
        $imageUrl = asset('storage/images/' . $image->filename);

        return response()->json([
            'message' => 'Image retrieved successfully',
            'data' => [
                'id' => $image->id,
                'url' => $imageUrl,
                'mime_type' => $image->mime_type,
            ],
        ]);
    }

    /**
     * Update an existing image.
     */
    public function update(Request $request, $id)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'image' => 'required|file|mimes:svg,png|max:2048', // Max 2MB
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the image by ID
        $imageModel = Image::find($id);

        if (!$imageModel) {
            return response()->json([
                'message' => 'Image not found',
            ], 404);
        }

        try {
            DB::beginTransaction();

            // Delete the old image file
            Storage::delete('public/images/' . $imageModel->filename);

            // Store the new image file
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            // $path = $image->storeAs('public/images', $filename);
            $path = $image->storeAs('images', $filename, 'public');


            // Update the image details in the database
            $imageModel->update([
                'filename' => $filename,
                'mime_type' => $image->getClientMimeType(),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Image updated successfully',
                'data' => $imageModel,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to update image',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Truncate the images table.
     */
    public function truncate()
    {
        try {
            DB::beginTransaction();
    
            // Log the start of the process
            \Log::info('Starting image truncation process.');
    
            // Delete all images from storage
            $images = Image::all();
            foreach ($images as $image) {
                $filePath = 'public/images/' . $image->filename;
                \Log::info('Deleting file:', ['file' => $filePath]);
    
                if (Storage::exists($filePath)) {
                    Storage::delete($filePath);
                    \Log::info('File deleted successfully:', ['file' => $filePath]);
                } else {
                    \Log::warning('File not found:', ['file' => $filePath]);
                }
            }
    
            // Truncate the table
            \Log::info('Truncating images table.');
            DB::table('images')->truncate();
    
            DB::commit();
    
            \Log::info('Images table truncated successfully.');
    
            return response()->json([
                'message' => 'Images table truncated successfully.',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
    
            \Log::error('Failed to truncate images table:', ['error' => $e->getMessage()]);
    
            return response()->json([
                'message' => 'Failed to truncate images table.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|mimes:pdf,doc,docx|max:2048', // Allow PDF and Word files
            ]);

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('uploads', $fileName, 'public'); // Save file to storage

                // Save file info to database
                $savedFile = File::create([
                    'name' => $fileName,
                    'path' => $filePath,
                    'mime_type' => $file->getClientMimeType(),
                    'size' => $file->getSize(), // Add file size
                    'user_id' => auth()->id(), // Associate with the authenticated user
                ]);

                return response()->json([
                    'message' => 'File uploaded successfully',
                    'file' => $savedFile,
                ], Response::HTTP_CREATED);
            }

            return response()->json(['message' => 'File upload failed'], Response::HTTP_BAD_REQUEST);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            Log::error('File upload error: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred while uploading the file',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function delete($id)
    {
        try {
            $file = File::find($id);

            if (!$file) {
                return response()->json(['message' => 'File not found'], Response::HTTP_NOT_FOUND);
            }

            // Delete file from storage
            Storage::disk('public')->delete($file->path);

            // Delete file record from database
            $file->delete();

            return response()->json(['message' => 'File deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('File deletion error: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred while deleting the file',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'file' => 'required|mimes:pdf,doc,docx|max:2048',
            ]);

            $file = File::find($id);

            if (!$file) {
                return response()->json(['message' => 'File not found'], Response::HTTP_NOT_FOUND);
            }

            // Delete old file from storage
            Storage::disk('public')->delete($file->path);

            // Upload new file
            $newFile = $request->file('file');
            $fileName = time() . '_' . $newFile->getClientOriginalName();
            $filePath = $newFile->storeAs('uploads', $fileName, 'public');

            // Update file record in database
            $file->update([
                'name' => $fileName,
                'path' => $filePath,
                'mime_type' => $newFile->getClientMimeType(),
            ]);

            return response()->json([
                'message' => 'File updated successfully',
                'file' => $file,
            ], Response::HTTP_OK);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            Log::error('File update error: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred while updating the file',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
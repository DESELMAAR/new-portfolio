<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class VideoController extends Controller
{
    // Upload a video
    public function upload(Request $request)
    {
        // Validate the request
        $request->validate([
            'title' => 'required|string|max:255',
            'video' => 'required|file|mimetypes:video/mp4,video/quicktime|max:102400', // Max 100MB
        ]);
    
        try {
            // Store the video file
            $file = $request->file('video');
    
            // Generate a unique file name
            $fileName = time() . '_' . $file->getClientOriginalName();
    
            // Store the file in the 'videos' directory within the 'public' disk
            $filePath = $file->storeAs('videos', $fileName, 'public');
    
            // Ensure the file was stored successfully
            if (!$filePath) {
                throw new \Exception('Failed to store the video file.');
            }
    
            // Log the file name and path
            \Log::info('File Name: ' . $fileName);
            \Log::info('File Path: ' . $filePath);
    
            // Save video metadata to the database
            $video = Video::create([
                'title' => $request->title,
                'file_name' => $fileName,
                'file_path' => $filePath,
            ]);
    
            // Return a success response
            return response()->json([
                'message' => 'Video uploaded successfully',
                'video' => $video,
            ], 201);
    
        } catch (\Exception $e) {
            // Handle any errors that occur during the upload process
            \Log::error('Video upload failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Video upload failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    // Delete a video
    public function delete($id)
    {
        // Find the video
        $video = Video::findOrFail($id);

        // Delete the video file from storage
        Storage::disk('public')->delete($video->file_path);

        // Delete the video record from the database
        $video->delete();

        return response()->json([
            'message' => 'Video deleted successfully',
        ], 200);
    }

    // Play a video
    public function play($id)
    {
        // Find the video
        $video = Video::findOrFail($id);

        // Get the video file path
        $filePath = storage_path('app/public/' . $video->file_path);

        // Check if the file exists
        if (!file_exists($filePath)) {
            return response()->json([
                'message' => 'Video file not found',
            ], 404);
        }

        // Stream the video file
        $stream = new StreamedResponse(function () use ($filePath) {
            $stream = fopen($filePath, 'rb');
            fpassthru($stream);
            fclose($stream);
        });

        // Set headers for streaming
        $stream->headers->set('Content-Type', 'video/mp4');
        $stream->headers->set('Content-Length', filesize($filePath));

        return $stream;
    }
}
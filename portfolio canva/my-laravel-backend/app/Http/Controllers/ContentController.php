<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class ContentController extends Controller
{
    /**
     * Store a new title and paragraph.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'paragraph' => 'required|string',
        ]);

        $content = Content::create([
            'title' => $request->title,
            'paragraph' => $request->paragraph,
        ]);

        return response()->json([
            'message' => 'Content created successfully',
            'data' => $content,
        ], 201);
    }

    /**
     * Update an existing title and paragraph.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'paragraph' => 'sometimes|string',
        ]);

        $content = Content::findOrFail($id);

        $content->update([
            'title' => $request->title ?? $content->title,
            'paragraph' => $request->paragraph ?? $content->paragraph,
        ]);

        return response()->json([
            'message' => 'Content updated successfully',
            'data' => $content,
        ], 200);
    }

    /**
     * Truncate the contents table.
     */
    public function truncate()
    {
        try {
            // Truncate the table
            DB::table('contents')->truncate();

            // Return a success response
            return Response::json([
                'message' => 'FileCv table truncated successfully.',
            ], 200);
        } catch (\Exception $e) {
            // Return an error response if something goes wrong
            return Response::json([
                'message' => 'Failed to truncate FileCv table.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show a specific content by ID.
     */
    public function show($id)
    {
        // Find the content by ID
        $content = Content::find($id);

        // If content is not found, return a 404 response
        if (!$content) {
            return response()->json([
                'message' => 'Content not found',
            ], 404);
        }

        // Return the content data
        return response()->json([
            'data' => $content,
        ], 200);
    }
}
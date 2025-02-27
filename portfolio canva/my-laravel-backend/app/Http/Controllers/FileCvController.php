<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\Models\FileCv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\DB;


class FileCvController extends Controller
{
    // Upload a file
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:pdf,doc,docx|max:2048',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = $file->getClientOriginalName();
            $path = $file->storeAs('uploads', $filename, 'public');

            // Store file metadata in the database
            $fileRecord = FileCv::create([
                'name' => $filename,
                'path' => $path,
            ]);

            return response()->json([
                'message' => 'File uploaded successfully',
                'file' => $fileRecord,
            ], 200);
        }

        return response()->json(['message' => 'No file uploaded'], 400);
    }

    // Download a file
    public function download($id)
{
    $fileRecord = FileCv::find($id);

    if (!$fileRecord) {
        return response()->json(['message' => 'File not found'], 404);
    }

    $path = storage_path('app/public/' . $fileRecord->path);

    if (!file_exists($path)) {
        return response()->json(['message' => 'File not found'], 404);
    }

    return response()->download($path);
}

    // Delete a file
    public function delete($id)
{
    $fileRecord = FileCv::find($id);

    if (!$fileRecord) {
        return response()->json(['message' => 'File not found'], 404);
    }

    $path = storage_path('app/public/' . $fileRecord->path);

    if (file_exists($path)) {
        unlink($path); // Delete the file from storage
    }

    $fileRecord->delete(); // Delete the file record from the database

    return response()->json(['message' => 'File deleted successfully'], 200);
}

public function truncate()
    {
        try {
            // Truncate the table
            DB::table('file_cvs')->truncate();

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
}

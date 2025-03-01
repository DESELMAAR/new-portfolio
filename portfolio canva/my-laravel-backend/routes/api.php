<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FileCvController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Middleware\HandleCors;

// Public routes
Route::apiResource('skills', SkillController::class)->only(['index', 'show']);

Route::apiResource('projects', ProjectController::class)->only(['index', 'show']);

Route::get('/download/{id}', [FileCvController::class, 'download']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/videos/{id}/play', [VideoController::class, 'play']);

// Protected routes with Sanctum authentication
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('projects', ProjectController::class)->except(['index', 'show']);
    Route::apiResource('skills', SkillController::class)->except(['index', 'show']);

    Route::prefix('files')->group(function () {
        Route::post('/upload', [FileController::class, 'upload']); // Upload file
        Route::delete('/delete/{id}', [FileController::class, 'delete']); // Delete file
        Route::put('/update/{id}', [FileController::class, 'update']); // Update file
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/files/download/{id}', [FileController::class, 'download']);
    Route::post('/upload', [FileCvController::class, 'upload']);
    Route::delete('/delete', [FileCvController::class, 'delete']);
    Route::delete('/file-cv/truncate', [FileCvController::class, 'truncate']);
    // Route::post('/videos/upload', [VideoController::class, 'upload']);


    Route::middleware([HandleCors::class])->group(function () {
        Route::post('/videos/upload', [VideoController::class, 'upload']);
    });


    Route::delete('/videos/{id}', [VideoController::class, 'delete']);
    Route::post('/logout', [AuthController::class, 'logout']);



    Route::post('/content', [ContentController::class, 'store']);
    Route::put('/content/{id}', [ContentController::class, 'update']);
    Route::delete('/content/truncate', [ContentController::class, 'truncate']);
    Route::delete('/images/truncate', [ImageController::class, 'truncate']);


    Route::post('/images', [ImageController::class, 'store']);
    Route::put('/images/{id}', [ImageController::class, 'update']);
});


Route::get('/content/{id}', [ContentController::class, 'show']);

Route::get('/images/{id}', action: [ImageController::class, 'show']);

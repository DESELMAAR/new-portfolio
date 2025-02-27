<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FileCvController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\VideoController;
Route::apiResource('skills', SkillController::class);
Route::apiResource('projects', ProjectController::class);


Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('files')->group(function () {
        Route::post('/upload', [FileController::class, 'upload']); // Upload file
        Route::delete('/delete/{id}', [FileController::class, 'delete']); // Delete file
        Route::put('/update/{id}', [FileController::class, 'update']); // Update file
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post("/files/upload", [FileController::class, 'upload']);

    Route::get('/files/download/{id}', [FileController::class, 'download']);
    Route::post('/upload', [FileCvController::class, 'upload']);

    Route::delete('/delete', [FileCvController::class, 'delete']);

    Route::delete('/file-cv/truncate', [FileCvController::class, 'truncate']);

    Route::post('/videos/upload', [VideoController::class, 'upload']);
    Route::delete('/videos/{id}', [VideoController::class, 'delete']);
});


Route::get('/download/{id}', [FileCvController::class, 'download']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::get('/videos/{id}/play', [VideoController::class, 'play']);

<?php
namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // Get all projects
    public function index()
    {
        return Project::all();
    }

    // Create a new project
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif', // Validate image upload
        'link' => 'nullable|url', // Validate URL
        'link_github' => 'nullable|url', // Validate URL
        'category' => 'required|string|max:255',
    ]);

    // Handle file upload
    $project = new Project();
    $project->name = $request->name;
    $project->link = $request->link;
    $project->link_github = $request->link_github;
    $project->category = $request->category;

    if ($request->hasFile('picture')) {
        $imagePath = $request->file('picture')->store('projects', 'public'); // Store image in storage/app/public/projects
        $project->picture = $imagePath;
    }

    $project->save();
    return $project;
}

    // Get a single project
    public function show($id)
    {
        return Project::findOrFail($id);
    }

    // Update a project
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image upload
            'link' => 'nullable|url', // Validate URL
            'link_github' => 'nullable|url', // Validate URL
            'category' => 'required|string|max:255',
        ]);

        $project = Project::findOrFail($id);
        $project->name = $request->name;
        $project->link = $request->link;
        $project->link_github = $request->link_github;
        $project->category = $request->category;

        if ($request->hasFile('picture')) {
            $imagePath = $request->file('picture')->store('projects', 'public'); // Store image in storage/app/public/projects
            $project->picture = $imagePath;
        }

        $project->save();
        return $project;
    }

    // Delete a project
    public function destroy($id)
    {
        return Project::destroy($id);
    }
}
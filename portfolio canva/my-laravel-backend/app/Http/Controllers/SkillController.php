<?php

namespace App\Http\Controllers;
use App\Models\Skill; 
use Illuminate\Http\Request;

class SkillController extends Controller
{
    // Get all skills
    public function index()
    {
        return Skill::all();
    }

    // Create a new skill
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'picture' => 'nullable|string', // You can validate image uploads here
    //         'category' => 'required|string|max:255',
    //     ]);

    //     return Skill::create($request->all());
    // }
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validate image upload
        'category' => 'required|string|max:255',
    ]);

    $skill = new Skill();
    $skill->name = $request->name;
    $skill->category = $request->category;

    if ($request->hasFile('picture')) {
        $imagePath = $request->file('picture')->store('skills', 'public'); // Store image in storage/app/public/skills
        $skill->picture = $imagePath;
    }

    $skill->save();
    return $skill;
}

    // Get a single skill
    public function show($id)
    {
        return Skill::findOrFail($id);
    }

    // Update a skill
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image upload
            'category' => 'required|string|max:255',
        ]);
    
        $skill = Skill::findOrFail($id);
        $skill->name = $request->name;
        $skill->category = $request->category;
    
        if ($request->hasFile('picture')) {
            $imagePath = $request->file('picture')->store('skills', 'public'); // Store image in storage/app/public/skills
            $skill->picture = $imagePath;
        }
    
        $skill->save();
        return $skill;
    }

    // Delete a skill
    public function destroy($id)
    {
        return Skill::destroy($id);
    }
}
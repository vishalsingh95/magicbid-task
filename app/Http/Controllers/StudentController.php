<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        // Just testing for now
        return response()->json(['message' => 'students index']);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        // For now, return back what was sent
        return response()->json([
            'message' => 'student saved',
            'data'    => $validated,
        ], 201);
    }
}

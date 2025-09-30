<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    // Fetch all students
    public function index()
    {
        return Student::all();
    }

    // Store a new student
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
        ]);

        $student = Student::create($request->all());
        return response()->json($student, 201);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use App\Models\Project;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;

class ProjectController extends Controller
{

    /**
     * Display a listing of the products.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    /**
     * Muestra los detalles de una casilla en concreto
     */
    public function showProject($id)
    {
        $projects = Project::find($id);
        return response()->json($projects, 200);
    }

    /**
     * Get the list of all projects
     * @return - Api response
     */
    public function getAll()
    {
        try {
            $projects = Project::all();
            return ApiResponse::success('List of projects', 200, $projects);
        } catch (Exception $e) {
            return ApiResponse::error('Error getting the list of projects: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Store a new project in the database
     * @param $request contains the data sent by the client to the server
     */
    public function store(Request $request)
    {
        try {
            // project field validations
            $request->validate([
                'project_name' => 'required|min:2|max:50',
                'definition' => 'required|min:10|max:150',
                'description' => 'required|min:10|max:100',
                'stories' => 'required|min:10|max:150',
            ]);

            // add project to database
            $data = Project::create($request->all());

            return response()->json(['message' => 'Project created successfully'], 200);
        } catch (ValidationException $e) {
            return ApiResponse::error('Error creating the project: ' . $e->getMessage(), 422);
        }
    }

    /**
     * Update the information of an existing project in the database.
     * @param $request contains the data sent by the client to the server
     * @param $id project id field
     */
    public function update(Request $request, $id)
    {
        try {
            // search project in the database by user id
            $data = Project::findOrFail($id);

            $request->validate([
                'project_name' => 'required|min:2|max:50',
                'definition' => 'required|min:10|max:150',
                'description' => 'required|min:10|max:100',
                'stories' => 'required|min:10|max:150',
            ]);

            // update project in the database
            $data->update([
                'project_name' => $request->input('project_name'),
                'definition' => $request->input('definition'),
                'description' => $request->input('description'),
                'stories' => $request->input('stories'),

            ]);

            return response()->json(['message' => 'Project updated successfully'], 200);
        } catch (ValidationException $e) {
            return ApiResponse::error('Error updating the project: ' . $e->getMessage(), 422);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Project not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error updating the project: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Delete a user from the database.
     * @param $id user id field
     */
    public function destroy($id)
    {
        try {
            // search project in the database by project id
            $project = Project::findOrFail($id);
            // Delete the project
            $project->delete();
            return ApiResponse::success('Project deleted successfully', 200);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Project not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error deleting the project: ' . $e->getMessage(), 500);
        }
    }
}

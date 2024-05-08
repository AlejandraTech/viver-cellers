<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * This controller handles operations related to user authentication, such as registration, login, update, and deletion.
 */

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use App\Models\User;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Get the list of all users
     * @return - Api response
     */
    function getAll()
    {
        try {
            $data = User::get();
            return ApiResponse::success('List of users', 200, $data);
        } catch (Exception $e) {
            return ApiResponse::error('Error to get the list of users ' . $e->getMessage(), 500);
        }
    }



    /**
     * Handles user authentication
     * @param $request contains the data sent by the client to the server
     * @return - JSON object format
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('auth_token', ['id' => $user->id, 'name' => $user->name, 'rol' => $user->rol])->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'rol' => $user->rol,
                ],
            ]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    /**
     * Register a new user.
     * @param $request contains the data sent by the client to the server
     * @return - Api response
     */
    public function register(Request $request)
    {
        // user field validations
        $validatedData = $request->validate([
            'name' => 'required|min:3|max:20|regex:/^[A-ZÑa-zñáéíóúÁÉÍÓÚ\'° ]+$/',
            'lastname' => 'required|min:3|max:20|regex:/^[A-ZÑa-zñáéíóúÁÉÍÓÚ\'° ]+$/',
            'dni' => 'string|min:9|max:9',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        try {
            // add user to database
            $user = User::create([
                'name' => $validatedData['name'],
                'lastname' => $validatedData['lastname'],
                'dni' => $validatedData['dni'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'rol' => 'client',
            ]);

            return ApiResponse::success('User registered successfully', 201, $user);
        } catch (Exception $e) {
            // if the email field is already in the database
            if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
                return ApiResponse::error('Error registering user: The email is already registered.', 409);
            }
            return ApiResponse::error('Error registering user: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Retrieve the information of the currently authenticated user
     * @param $request contains the data sent by the client to the server
     */
    public function getUser(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'lastname' => $user->lastname,
                'email' => $user->email,
                'rol' => $user->rol,
            ]
        ]);
    }

    /**
     * Log out the current user.
     * @param $request contains the data sent by the client to the server
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return ApiResponse::success('Logged out successfully', 200);
        } catch (Exception $e) {
            return ApiResponse::error('Error logging out: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Store a new user in the database
     * @param $request contains the data sent by the client to the server
     */
    public function store(Request $request)
    {
        try {
            // user field validations
            $request->validate([
                'name' => 'required|min:3|max:20|regex:/^[A-ZÑa-zñáéíóúÁÉÍÓÚ\'° ]+$/',
                'lastname' => 'required|min:3|max:20|regex:/^[A-ZÑa-zñáéíóúÁÉÍÓÚ\'° ]+$/',
                'dni' => 'string|min:9|max:9',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|string|min:8',
                'rol' => 'required|in:admin,client,nurseryman',
            ]);

            // add user to database
            $data = User::create($request->all());
            return ApiResponse::success('User created successfully', 201, $data);
        } catch (ValidationException  $e) {
            return ApiResponse::error('Error of validation' . $e->getMessage(), 422);
        }
    }

    /**
     * Update the information of an existing user in the database.
     * @param $request contains the data sent by the client to the server
     * @param $id user id field
     */
    function update(Request $request, $id)
    {
        try {
            // search user in the database by user id
            $data = User::findOrFail($id);

            // user field validations
            $request->validate([
                'password' => 'required|string|min:8',
                'rol' => 'required|in:admin,client,nurseryman',
            ]);

            // update user in the database
            $data->update([
                'password' => bcrypt($request->input('password')), // Make sure to encrypt the password if necessary
                'rol' => $request->input('rol')
            ]);

            return ApiResponse::success('User updated successfully', 200, $data);
        } catch (ValidationException  $e) {
            return ApiResponse::error('Validation error: ' . $e->getMessage(), 422);
        } catch (ModelNotFoundException  $e) {
            return ApiResponse::error('User not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error updating user: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get the list of available roles.
     */
    public function getRoles()
    {
        try {
            $roles = ['client', 'nurseryman', 'admin']; // Static list of roles
            return ApiResponse::success('List of roles', 200, $roles);
        } catch (Exception $e) {
            return ApiResponse::error('Error getting roles: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Delete a user from the database.
     * @param $id user id field
     */
    function destroy($id)
    {
        try {
            // search user in the database by user id
            $users = User::findOrFail($id);
            // Delete the user
            $users->delete();
            return ApiResponse::success('User deleted successfully', 200);
        } catch (ModelNotFoundException  $e) {
            return ApiResponse::error('User not found', 404);
        }
    }

    /**
     * Update the information of an existing user in the database.
     * @param $request contains the data sent by the client to the server
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'name' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'required|string|min:8',
        ]);

        $user->update([
            'name' => $validatedData['name'],
            'lastname' => $validatedData['lastname'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        return response()->json(['message' => 'Perfil actualizado con éxito'], 200);
    }
}

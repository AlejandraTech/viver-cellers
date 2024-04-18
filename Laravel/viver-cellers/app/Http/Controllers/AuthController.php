<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Province;
use Illuminate\Http\Request;
use App\Models\User;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function getProvinces()
    {
        try {
            $provinces = Province::all();
            return ApiResponse::success('List of provinces', 200, $provinces);
        } catch (Exception $e) {
            return ApiResponse::error('Error to get the list of provinces ' . $e->getMessage(), 500);
        }
    }

    function getAll()
    {
        try {
            $data = User::get();
            return ApiResponse::success('List of users', 200, $data);
        } catch (Exception $e) {
            return ApiResponse::error('Error to get the list of users ' . $e->getMessage(), 500);
        }
    }

    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'id_province_fk' => 'required',
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'dni' => 'required|string|max:9',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        try {
            $user = User::create([
                'id_province_fk' => $validatedData['id_province_fk'],
                'name' => $validatedData['name'],
                'lastname' => $validatedData['lastname'],
                'dni' => $validatedData['dni'],
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'rol' => 'client',
            ]);

            return ApiResponse::success('User registered successfully', 201, $user);
        } catch (Exception $e) {
            if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
                return ApiResponse::error('Error registering user: The email is already registered.', 409);
            }
            return ApiResponse::error('Error registering user: ' . $e->getMessage(), 500);
        }
    }
}

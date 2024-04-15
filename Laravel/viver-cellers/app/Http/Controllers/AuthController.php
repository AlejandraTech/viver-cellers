<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use App\Models\User;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    function getAll()
    {
        try{
            $data = User::get();
            return ApiResponse::success('List of users',200, $data);

        } catch(Exception $e){
            return ApiResponse::error('Error to get the list of users ' .$e->getMessage(),500);
        }
    }
}

<?php
/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * File that handles the JSON response format for database queries.
 * @Reference: https://www.youtube.com/watch?v=lrl_jTrra94&t=3337s
 */
namespace App\Http\Responses;

class ApiResponse
{
    /**
     * Function that handles the response in JSON format when everything is working fine.
     */
    public static function success($message = 'Success', $statusCode = 200, $data = []){
        return response()->json([
            'message' => $message,
            'statusCode' => $statusCode,
            'error' => false,
            'data' => $data,
        ],$statusCode);
    }


    /**
     * Function that handles the response in JSON format when it has given an error.
     */
    public static function error($message = 'Error', $statusCode = 200, $data = []){
        return response()->json([
            'message' => $message,
            'statusCode' => $statusCode,
            'error' => true,
            'data' => $data,
        ],$statusCode);
    }
}

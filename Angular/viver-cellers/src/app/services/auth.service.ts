// Performing operations related to authentication and user management with linkage to Laravel.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'http://localhost:8000/api'; // Base URL for API requests

  // HTTP headers options for JSON content
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { } // HttpClient injection into the constructor

  // Method to fetch users from the API
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/users').pipe(
      catchError(this.errorHandler)
    )
  }

  // Method to post user data to the API
  postUsers(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + `/users`, userData, this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  // Method to update user data on the API
  updateUser(userData: any, userId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, userData, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  // Method to fetch user roles from the API
  getRoles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/roles`).pipe(
      catchError(this.errorHandler)
    );
  }

  // Method to delete a user from the API
  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  // Method to register a user on the API
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/register', userData, this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  // Method to fetch provinces from the API
  getProvinces(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/provinces`).pipe(
      catchError(this.errorHandler)
    );
  }

  // Error handler method for HTTP errors
  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage); // Throwing the error message as an Observable
  }
}

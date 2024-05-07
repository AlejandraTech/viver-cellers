// Performing operations related to authentication and user management with linkage to Laravel.

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8000/api'; // Base URL for API requests

  // HTTP headers options for JSON content
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { } // HttpClient injection into the constructor

  // Method to register a user on the API
  registerUser(userData: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl + '/register', userData, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Method to login a user on the API
  login(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Method to logout a user on the API
  logout(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      map(() => {
        // Remove user data from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_rol');
      }),
      catchError(this.errorHandler)
    );
  }

  // Check if the access token exists in local storage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Check if the user has an admin role
  isAdmin(): boolean {
    const userRol = localStorage.getItem('user_rol');
    return userRol === 'admin';
  }

  // Check if the user has a client role
  isClient(): boolean {
    const userRol = localStorage.getItem('user_rol');
    return userRol === 'client';
  }

  // Check if the user has a nurseryman role
  isNurseryman(): boolean {
    const userRol = localStorage.getItem('user_rol');
    return userRol === 'nurseryman';
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    return of(token !== null);
  }

  // Method to fetch users from the API
  getUsers(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl + '/users')
      .pipe(catchError(this.errorHandler));
  }

  getUser(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http
      .get(`${this.apiUrl}/user`, { headers })
      .pipe(map((response: any) => response.data));
  }

  // Method to fetch user roles from the API
  getRoles(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/users/roles`)
      .pipe(catchError(this.errorHandler));
  }

  // Method to post user data to the API
  postUsers(userData: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl + `/users`, userData, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Method to update user data on the API
  updateUser(userData: any, userId: number): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/users/${userId}`, userData, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Method to delete a user from the API
  deleteUser(userId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/users/${userId}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Method to register a user on the API
  addUser(userData: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/users`, userData, this.httpOptions)
      .pipe(catchError(this.errorHandler));
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

  updateProfile(profileData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    });
    return this.http.put(`${this.apiUrl}/user`, profileData, { headers });
  }
}

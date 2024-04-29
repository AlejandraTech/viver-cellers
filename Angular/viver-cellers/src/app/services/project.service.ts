// Performing operations related to authentication and user management with linkage to Laravel.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl: string = 'http://localhost:8000/api'; // Base URL for API requests

  // HTTP headers options for JSON content
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { } // HttpClient injection into the constructor

  getProjectDetails(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projectDetails/${id}`);
  }

  // Método para obtener todos los productos desde el backend
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/project-info`);
  }

  // Method to fetch projects from the API
  getProjects(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/project').pipe(
      catchError(this.errorHandler)
    )
  }

  // Method to post project data to the API
  postProjects(projectData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + `/project`, projectData, this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  // Method to update project data on the API
  updateProject(projectData: any, projectId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/project/${projectId}`, projectData, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  // Method to delete a project from the API
  deleteProject(projectId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/project/${projectId}`, this.httpOptions).pipe(
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

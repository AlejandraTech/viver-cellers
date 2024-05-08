/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Performing CRUD operations of projects with Laravel binding.
 */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl: string = 'http://localhost:8000/api/project'; // Base URL for API requests

  // HTTP headers options for JSON content
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {} // HttpClient injection into the constructor

  /**
   * Gets all projects from the api (ApiResponse format)
   * @returns Observable containing the array with the data coming from the database.
   */
  getProjects(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Gets all projects from the api (json format)
   * @returns Observable containing the array with the data coming from the database.
   */
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/information`);
  }

  /**
   * Gets the details of a specific project by ID from the API.
   * @param id ID of the project
   * @returns Observable containing the array with the data coming from the database.
   */
  getProjectDetails(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/details/${id}`);
  }

  /**
   * Insert a project in the database
   * @param projectData Data to be inserted
   * @returns An Observable that emits the API response after insert the project.
   */
  postProjects(projectData: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, projectData, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Update a project in the database
   * @param projectData Data to be updated
   * @param projectId id field of the project to be updated
   * @returns An Observable that emits the API response after updating the project.
   */
  updateProject(projectData: any, projectId: number): Observable<any> {
    return this.http
      .put<any>(
        `${this.apiUrl}/${projectId}`,
        projectData,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

   /**
   * Delete a project in the database
   * @param projectId id field of the project to be deleted
   * @returns An Observable that emits the API response after deleting the project.
   */
  deleteProject(projectId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/${projectId}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Handles HTTP errors
   * @param error HTTP error response
   * @returns  An Observable that emits the error message.
   */
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

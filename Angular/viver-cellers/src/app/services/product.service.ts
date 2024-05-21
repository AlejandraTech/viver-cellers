/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Performing CRUD operations of product with Laravel binding.
 */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string = 'http://localhost:8000/api/product'; // Base URL for API requests

  // HTTP headers options for JSON content
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { } // HttpClient injection into the constructor

  /**
   * Gets all products from the api (ApiResponse format)
   * @returns Observable containing the array with the data coming from the database.
   */
  getProduct(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(catchError(this.errorHandler));
  }

   /**
   * Gets all products from the api (json format)
   * @returns Observable containing the array with the data coming from the database.
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/information`);
  }

    /**
   * Gets the details of a specific product by ID from the API.
   * @param id ID of the product
   * @returns Observable containing the array with the data coming from the database.
   */
  getProductDetails(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/details/${id}`);
  }

  /**
   * Insert a product in the database
   * @param productData Data to be inserted
   * @returns An Observable that emits the API response after insert the product.
   */
  postProduct(productData: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, productData, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Update a product in the database
   * @param productData Data to be updated
   * @param productId id field of the product to be updated
   * @returns An Observable that emits the API response after updating the product.
   */
  updateProduct(productData: any, productId: number): Observable<any> {
    return this.http
      .put<any>(
        `${this.apiUrl}/${productId}`,
        productData,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Delete a product in the database
   * @param productId id field of the product to be deleted
   * @returns An Observable that emits the API response after deleting the product.
   */
  deleteProduct(productId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/${productId}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Gets all categories from the api (ApiResponse format)
   * @returns Observable containing the array with the data coming from the database.
   */
  getCategory(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/category`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Gets all varieties from the api (ApiResponse format)
   * @returns Observable containing the array with the data coming from the database.
   */
  getVariety(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/variety`)
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
}

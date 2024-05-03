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

  // Method to fetch product from the API
  getProduct(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(catchError(this.errorHandler));
  }

  // Método para obtener todos los productos desde el backend
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/information`);
  }

  getProductDetails(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/details/${id}`);
  }


  // Method to post product data to the API
  postProduct(productData: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, productData, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Method to update product data on the API
  updateProduct(productData: any, productId: number): Observable<any> {
    return this.http
      .put<any>(
        `${this.apiUrl}/${productId}`,
        productData,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  // Method to delete a product from the API
  deleteProduct(productId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/${productId}`, this.httpOptions)
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los productos desde el backend
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductDetails(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productDetails/${id}`);
  }
}

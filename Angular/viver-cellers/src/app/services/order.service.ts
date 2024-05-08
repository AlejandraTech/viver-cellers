// This service is used to make HTTP requests related to user orders

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api'; // The base URL for HTTP requests

  constructor(private http: HttpClient) { }

  // Method to get user orders by making a GET request to the server.
  getUserOrders(): Observable<any> {
    return this.http.get(this.apiUrl + '/user/orders');
  }
}

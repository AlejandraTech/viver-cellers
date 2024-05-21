/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Performing CRUD operations of order with Laravel binding.
 */
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

  // Method to obtain orders from a nurseryman
  getNurserymanOrders(): Observable<any> {
    return this.http.get(this.apiUrl + '/user/ordersNurseryman');
  }

  // Method to display specific sizes of the status of an order
  showOrderDetails(orderId: number): Observable<any> {
    return this.http.get(this.apiUrl + `/user/ordersNurseryman/${orderId}`);
  }

  // Method to obtain order statuses
  getOrderStatuses(): Observable<any> {
    return this.http.get(this.apiUrl + '/order-statuses');
  }

  // Method to update the status of an order
  updateOrderStatus(orderId: number, statusId: number): Observable<any> {
    return this.http.put(this.apiUrl + `/orders/${orderId}/status`, { status_id: statusId });
  }

  // Method to obtain sales and cancellations
  getSalesAndCancellations(): Observable<any> {
    return this.http.get(this.apiUrl + '/nurseryman/sales-cancellations');
  }
}

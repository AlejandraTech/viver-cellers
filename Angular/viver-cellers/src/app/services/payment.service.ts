/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Performing method of payment with Laravel binding.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  // Method to process payment by sending order data to the backend
  processPayment(orderData: { token: string; address: string; items: { id: number; quantity: number; }[]; total: number; }) {
    return this.http.post(`${this.apiUrl}checkout`, orderData);
  }
}

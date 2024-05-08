import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  processPayment(orderData: { token: string; address: string; items: { id: number; quantity: number; }[]; total: number; }) {
    return this.http.post(`${this.apiUrl}checkout`, orderData);
  }
}

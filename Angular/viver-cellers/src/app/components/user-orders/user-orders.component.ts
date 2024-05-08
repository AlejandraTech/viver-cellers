// This component is used to display user orders

import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders: any = []; // List to store user orders
  statusList = [ // List of possible order statuses
    { id: 1, name: 'Pendent de pagament' },
    { id: 2, name: 'Pagament rebut' },
    { id: 3, name: 'En procés de preparació' },
    { id: 4, name: 'En camí' },
    { id: 5, name: 'Lliurat' },
    { id: 6, name: 'Cancel·lat' }
  ];

  // Inject the OrderService service in the constructor
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadUserOrders(); // When the component initializes, load user orders
  }

  // Method to load user orders using the OrderService service
  loadUserOrders(): void {
    this.orderService.getUserOrders().subscribe({
      // If the request is successful, assign the order data to the 'orders' list
      next: (data) => {
        this.orders = data;
      },
      // If there is an error in the request, log an error message to the console
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }
}

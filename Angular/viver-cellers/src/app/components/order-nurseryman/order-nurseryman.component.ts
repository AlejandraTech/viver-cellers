import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-nurseryman',
  templateUrl: './order-nurseryman.component.html',
  styleUrls: ['./order-nurseryman.component.css']
})
export class OrderNurserymanComponent implements OnInit {
  orders: any[] = [];
  statuses: any[] = [];
  isModifyFormVisible: boolean = false;
  isDetailsVisible: boolean = false;
  selectedOrder: any = null;
  modifyOrderForm: FormGroup;

  constructor(private orderService: OrderService, private fb: FormBuilder) {
    this.modifyOrderForm = this.fb.group({
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadNurserymanOrders();
    this.loadOrderStatuses();
  }

  loadNurserymanOrders(): void {
    this.orderService.getNurserymanOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
      },
      error: (error) => {
        console.error('Error fetching nurseryman orders', error);
      }
    });
  }

  loadOrderStatuses(): void {
    this.orderService.getOrderStatuses().subscribe({
      next: (response) => {
        this.statuses = response.data;
      },
      error: (error) => {
        console.error('Error fetching order statuses', error);
      }
    });
  }

  showDetails(order: any): void {
    this.orderService.showOrderDetails(order.id).subscribe({
      next: (response) => {
        this.selectedOrder = response.data;
        this.isDetailsVisible = true;
      },
      error: (error) => {
        console.error('Error fetching order details', error);
      }
    });
  }

  showModifyForm(order: any): void {
    this.selectedOrder = order;
    this.isModifyFormVisible = true;
    this.modifyOrderForm.patchValue({
      status: order.order_status_id
    });
  }

  onSubmit(): void {
    if (this.modifyOrderForm.valid && this.selectedOrder) {
      const statusId = this.modifyOrderForm.get('status')?.value;
      this.orderService.updateOrderStatus(this.selectedOrder.id, statusId).subscribe({
        next: (response) => {
          console.log('Order status updated successfully', response);
          this.isModifyFormVisible = false;
          this.loadNurserymanOrders();
        },
        error: (error) => {
          console.error('Error updating order status', error);
        }
      });
    }
  }

  cancelar(): void {
    this.isModifyFormVisible = false;
    this.selectedOrder = null;
  }
}

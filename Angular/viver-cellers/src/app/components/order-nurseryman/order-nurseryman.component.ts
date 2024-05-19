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
  successMessage: string = '';
  errorMessage: string = '';

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
          this.successMessage = 'Perfil actualitzat amb exit';
          this.errorMessage = '';
          this.isModifyFormVisible = false;
          this.loadNurserymanOrders();
        },
        error: (error) => {
          console.error('Error updating order status', error);
          this.errorMessage = "Error en actualitzar el perfil. Si us plau, torna-ho a intentar més tard";
          this.successMessage = '';
        }
      });
    }
  }

  cancelar(): void {
    this.isModifyFormVisible = false;
    this.selectedOrder = null;
  }

  closeSuccessMessage(): void {
    this.successMessage = '';
  }

  closeErrorMessage(): void {
    this.errorMessage = '';
  }

  /**
   Check the status of the order to associate a style to it
   @param status of the order
   @returns style
  */
  getOrderStatusClass(status: string) {
    switch (status) {
      case 'Pendent de pagament':
        return 'bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300';
      case 'Pagament rebut':
        return 'bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300';
      case 'En procés de preparació':
        return 'bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300';
      case 'En camí':
        return 'bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300';
      case 'Lliurat':
        return 'bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"';
      case 'Cancel·lat':
        return 'bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}

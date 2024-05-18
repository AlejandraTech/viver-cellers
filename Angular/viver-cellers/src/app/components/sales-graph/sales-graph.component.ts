import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Cancellation } from 'src/app/models/Cancellation';
import { Sale } from 'src/app/models/Sale';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.css']
})
export class SalesGraphComponent implements OnInit {

  // Constructor of the component that injects the OrderService and registers the necessary components of Chart.js
  constructor(private orderService: OrderService) {
    Chart.register(...registerables);
  }

  // Angular lifecycle method that executes when the component is initialized
  // Calls the method to load sales and cancellations data
  ngOnInit(): void {
    this.loadSalesAndCancellations();
  }

  // Method to load sales and cancellations from the service
  // Makes a request to the service and handles the response
  loadSalesAndCancellations(): void {
    this.orderService.getSalesAndCancellations().subscribe({
      // Handles the successful response
      next: (response: { message: string, statusCode: number, error: boolean, data: { sales: Sale[], cancellations: Cancellation[] } }) => {
        const { sales, cancellations } = response.data;
        if (sales && cancellations) {
          this.generateChart(sales, cancellations);
        } else {
          console.error('Sales or cancellations data is missing:', response.data);
        }
      },
      error: (error: any) => {
        console.error('Error fetching sales and cancellations:', error);
      }
    });
  }

  // Method to generate the sales and cancellations chart
  // Configures and renders a bar chart using Chart.js
  generateChart(sales: Sale[], cancellations: Cancellation[]): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const productNames = sales.map((s: Sale) => s.product.name);

    // Configures the chart with sales and cancellations data
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [
          {
            label: 'Vendes',
            data: sales.map((s: Sale) => s.count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Cancel·lacions',
            data: cancellations.map((c: Cancellation) => c.count),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

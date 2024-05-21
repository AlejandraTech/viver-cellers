import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.css']
})
export class InfoProductComponent implements OnInit {
  // Arrray to save products
  products: any[] = [];

  // The services are injected in the constructor
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  /**
    * Get product ID from route parameters
    * Use `this.route.snapshot.paramMap.get('id')` to get the `id` parameter from the URL.
    * Converts the ID value to a number.
    *  Get product details
    * Calls the `getProductDetails` method of the `productService` service passing the product ID.
    * Subscribe to the service's response.
    * If the request is successful, assign the received data to the `products` property as an array with a single element.
    * If an error occurs, display an error message in the console.
    * Redirect to the error page using `this.router.navigate(['/error'])` if the product is not found.
   */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductDetails(id).subscribe(
      data => {
        this.products = [data];
      },
      error => {
        console.error(`Error retrieving product details:`, error);
        // Redirect to error page if product not found
        this.router.navigate(['/error']);
      }
    );
  }
}

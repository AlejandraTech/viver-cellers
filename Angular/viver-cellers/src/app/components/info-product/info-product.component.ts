import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.css']
})
export class InfoProductComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

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

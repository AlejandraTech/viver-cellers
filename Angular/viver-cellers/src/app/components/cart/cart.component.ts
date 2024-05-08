import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cart = items;
    });
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  // Método para finalizar la compra
  checkout(): void {
    // Obtener solo las IDs de los productos en el carrito
    const productIds = this.cart.map(product => product.id);

    // Obtener el precio total sumado de los productos en el carrito
    const totalPrice = this.cart.reduce((total, product) => total + product.price, 0);

    // Redirigir a la página de pago y pasar el precio total y las IDs como parámetros de consulta
    this.router.navigate(['/payment'], { queryParams: { amount: totalPrice, productIds: JSON.stringify(productIds) } });
  }
}

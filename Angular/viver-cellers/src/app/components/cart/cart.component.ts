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

    console.log('Has clicado a finalizar compra');

    // // Obtener los productos del carrito directamente del observable
    // const products = this.cart;

    // // Realizar la solicitud POST al servicio de compra
    // this.purchaseService.finalizePurchase(products).subscribe(
    //   () => {
    //     console.log('Compra realizada con éxito');
    //     // Aquí podrías redirigir a una página de confirmación o realizar otras acciones necesarias
    //   },
    //   (error) => {
    //     console.error('Error al finalizar la compra: ', error);
    //     // Aquí podrías mostrar un mensaje de error al usuario o realizar otras acciones necesarias
    //   }
    // );
  }
}

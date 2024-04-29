import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  // Método para añadir un producto al carrito
  addToCart(product: Product): void {
    const currentCart = this.cartItemsSubject.getValue();
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      existingItem.quantity++;
      this.cartItemsSubject.next([...currentCart]);
    } else {
      // Si es un nuevo producto, añadirlo al carrito
      product.quantity = 1;
      this.cartItemsSubject.next([...currentCart, product]);
    }
  }

  // Método para quitar un producto del carrito
  removeFromCart(product: Product): void {
    const currentCart = this.cartItemsSubject.getValue();
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        // Si hay más de un producto, reducir la cantidad
        existingItem.quantity--;
      } else {
        // Si solo hay un producto, eliminarlo del carrito
        const updatedCart = currentCart.filter(item => item.id !== product.id);
        this.cartItemsSubject.next(updatedCart);
      }
    }
  }

  isInCart(product: Product): boolean {
    const currentCart = this.cartItemsSubject.getValue();
    return currentCart.some(item => item.id === product.id);
  }

  getQuantityInCart(product: Product): number {
    const currentCart = this.cartItemsSubject.getValue();
    const existingItem = currentCart.find(item => item.id === product.id);
    return existingItem ? existingItem.quantity : 0;
  }
}

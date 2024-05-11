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

  // Method to add a product to the cart
  addToCart(product: Product): void {
    const currentCart = this.cartItemsSubject.getValue();
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      // If the product is already in the cart, increase the quantity
      existingItem.quantity++;
      this.cartItemsSubject.next([...currentCart]);
    } else {
      // If it's a new product, add it to the cart
      product.quantity = 1;
      this.cartItemsSubject.next([...currentCart, product]);
    }
  }

  // Method to remove a product from the cart
  removeFromCart(product: Product): void {
    const currentCart = this.cartItemsSubject.getValue();
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        // If there's more than one product, decrease the quantity
        existingItem.quantity--;
      } else {
        // If there's only one product, remove it from the cart
        const updatedCart = currentCart.filter(item => item.id !== product.id);
        this.cartItemsSubject.next(updatedCart);
      }
    }
  }

  // Method to check if a product is in the cart
  isInCart(product: Product): boolean {
    const currentCart = this.cartItemsSubject.getValue();
    return currentCart.some(item => item.id === product.id);
  }

  // Method to clear the shopping cart
  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  // Method to get the quantity of a specific product in the cart
  getQuantityInCart(product: Product): number {
    const currentCart = this.cartItemsSubject.getValue();
    const existingItem = currentCart.find(item => item.id === product.id);
    return existingItem ? existingItem.quantity : 0;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  /**
   * Class member variables to store keys and cart items
   * cartKey: Key for accessing cart data in localStorage
   * cartItemsSubject: Subject for managing cart items as observable
   */
  private cartKey = 'cart';
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);

  constructor() {
    // Retrieve cart products stored in localStorage upon service initialization
    const storedCartItems = localStorage.getItem(this.cartKey);
    if (storedCartItems) {
      this.cartItemsSubject.next(JSON.parse(storedCartItems));
    }
  }

  // Observable property to access cart items
  get cartItems$() {
    return this.cartItemsSubject.asObservable();
  }

  /**
   * Method to add a product to the cart
   * If the product is already in the cart, increase its quantity
   * If the product is not in the cart and there is available stock, add it to the cart
   * If there is no available stock, log an error message
   */
  addToCart(product: Product): void {
    const currentCart = this.cartItemsSubject.value;
    const existingItem = currentCart.find(item => item.id === product.id);


    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;
        this.saveCartToLocalStorage([...currentCart]);
      } else {
        console.log('Cannot add more. Stock limit reached.');
      }
    } else {
      if (product.stock > 0) {
        product.quantity = 1;
        this.saveCartToLocalStorage([...currentCart, product]);
      } else {
        console.log('Cannot add. Product out of stock.');
      }
    }
  }

  /**
   * Method to remove a product from the cart
   * If the product is in the cart and its quantity is greater than 1, decrease its quantity
   * If the product is in the cart and its quantity is 1, remove it from the cart
   */
  removeFromCart(product: Product): void {
    const currentCart = this.cartItemsSubject.value;
    const existingItem = currentCart.find(item => item.id === product.id);


    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        this.saveCartToLocalStorage([...currentCart]);
      } else {
        const updatedCart = currentCart.filter(item => item.id !== product.id);
        this.saveCartToLocalStorage(updatedCart);
      }
    }
  }

  /**
   * Method to save cart items to localStorage
   * Serialize cart items, store them in localStorage, update cartItemsSubject
   */
  private saveCartToLocalStorage(cartItems: Product[]): void {
    const serializedCartItems = JSON.stringify(cartItems);
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
    localStorage.setItem(this.cartKey, serializedCartItems);
    this.cartItemsSubject.next(cartItems);
  }

  // Method to clear the cart by removing cart items from localStorage and updating cartItemsSubject
  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.cartItemsSubject.next([]);
  }

  // Method to check if a product is already in the cart
  // Return true if the product is found in the cart, false otherwise
  isInCart(product: Product): boolean {
    const currentCart = this.cartItemsSubject.value;
    return currentCart.some(item => item.id === product.id);
  }

  // Method to get the quantity of a specific product in the cart
  // Return the quantity of the product if found in the cart, otherwise return 0
  getQuantityInCart(product: Product): number {
    const currentCart = this.cartItemsSubject.value;
    const foundProduct = currentCart.find(item => item.id === product.id);
    return foundProduct ? foundProduct.quantity : 0;
  }

}

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

  cart: Product[] = []; // Array to store product
  isCartEmpty: boolean = true; //Variable that checks if the carriage is empty
  totalItems: number = 0; //Variable that counts the total products in the shopping cart


  constructor(private cartService: CartService, private router: Router) { }

  /**
  * Method executed when the component initializes
  */
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cart = items;
      this.isCartEmpty = this.cart.length === 0;
      this.totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
    });
  }

  /**
   * Method that removes a product from the cart
   * @param product to be eliminated
   */
  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
  }


  /**
   * Method to finalize the purchase
   */
  checkout(): void {
    // Obtain only the IDs of products in the cart
    const productIds = this.cart.map(product => product.id);

    // Get the total sum price of the products in the cart
    const totalPrice = this.cart.reduce((total, product) => total + product.price, 0);

    // Redirect to the payment page and pass the total price and IDs as query parameters
    this.router.navigate(['/payment'], { queryParams: { amount: totalPrice, productIds: JSON.stringify(productIds) } });
  }

  /**
   * Method adding a product to the cart
   * @param product to be added
   */
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Method that checks if a product is already in the cart
   * @param product to be checked
   * @returns true if the product is present, false if it is not.
   */
  isInCart(product: Product): boolean {
    return this.cartService.isInCart(product);
  }

  /**
   * Method that counts the total quantity of a product
   * @param product to be accounted
   * @returns If the product exists it returns the quantity, if it does not exist it returns 0.
   */
  getQuantityInCart(product: Product): number {
    return this.cartService.getQuantityInCart(product);
  }

  /**
   * Method that calculates the total price of all products in the cart
   * @returns total price
   */
  getTotalPrice(): number {
    let total = 0;
    for (const product of this.cart) {
      total += product.price * product.quantity;
    }
    return total;
  }

  /**
   * Method that deletes all products from the cart
   */
  clearCart(): void {
    this.cartService.clearCart();
  }
}

import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../services/cart.service';
import { Product } from 'src/app/models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  stripePromise = loadStripe('pk_test_Dt4ZBItXSZT1EzmOd8yCxonL'); // Initialize a promise to load Stripe.js library
  card: any; // Placeholder for the card element
  stripe: any; // Placeholder for the Stripe object
  elements: any; // Placeholder for Stripe elements
  address: string = ''; // User's address
  city: string = ''; // User's city
  street: string = ''; // User's street
  streetNumber: string = ''; // User's street number
  apartmentNumber: string = ''; // User's apartment number
  postalCode: string = ''; // User's postal code
  cart: Product[] = []; // Array to hold items in the cart

  constructor(private paymentService: PaymentService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to cart items changes
    this.cartService.cartItems$.subscribe(items => {
      this.cart = items;
    });
    // Initialize Stripe.js when component initializes
    this.initStripe();
  }
  async initStripe() {
    // Load Stripe.js library
    this.stripe = await this.stripePromise;
    // Initialize Stripe elements
    this.elements = this.stripe.elements();
    // Create a card element
    this.card = this.elements.create('card');
    // Mount the card element to the DOM
    this.card.mount('#card-element');
  }

  async processPayment() {
    // Create a token for the payment
    const { token, error } = await this.stripe.createToken(this.card);

    // Handle errors, if any
    if (error) {
      console.error('Error:', error);
      return;
    }

    // Construct full address from input fields
    const fullAddress = `${this.street} ${this.streetNumber}, ${this.apartmentNumber}, ${this.postalCode}, ${this.city}`;

    // Prepare data for the order
    const orderData = {
      token: token.id,
      address: fullAddress,
      items: this.cart.map(item => ({ id: item.id, quantity: item.quantity })),
      total: this.cart.reduce((total, product) => total + product.price * product.quantity, 0)
    };

    // Process the payment using the payment service
    this.paymentService.processPayment(orderData).subscribe({
      next: (res) => {
        console.log('Payment successful', res);
        // Clear the cart and navigate to the order confirmation page
        this.cartService.clearCart();
        this.router.navigate(['/user_order']);
      },
      error: (err) => {
        console.error('Payment error:', err);
      }
    });
  }
}

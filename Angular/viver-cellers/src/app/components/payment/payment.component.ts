import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  payment!: FormGroup;

  errorMessage: string = '';

  constructor(private paymentService: PaymentService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cart = items;
    });

    this.initStripe();

    this.payment = new FormGroup({
      city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙçÇ'° ]+$")]),
      street: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150), Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙçÇ'° ]+$")]),
      streetNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      apartmentNumber: new FormControl('', [Validators.pattern(/^\d+ \d+$/)]),
      postalCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]),
    });
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

    if (this.payment.valid) {
      this.city = this.payment.value.city;
      this.street = this.payment.value.street;
      this.streetNumber = this.payment.value.streetNumber;
      this.apartmentNumber = this.payment.value.apartmentNumber;
      this.postalCode = this.payment.value.postalCode;

      // Construct full address from input fields
      let fullAddress = `${this.street} ${this.streetNumber}, ${this.postalCode}, ${this.city}`;
      if (this.apartmentNumber.trim() !== '') {
        fullAddress += `, ${this.apartmentNumber}`;
      }

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
    } else {
      this.errorMessage = `S'ha produït un error en realitzar el pagament de la compra`;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../services/cart.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  stripePromise = loadStripe('pk_test_Dt4ZBItXSZT1EzmOd8yCxonL');
  card: any;
  stripe: any;
  elements: any;
  address: string = '';
  cart: Product[] = [];

  constructor(private paymentService: PaymentService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cart = items;
    });
    this.initStripe();
  }

  async initStripe() {
    this.stripe = await this.stripePromise;
    this.elements = this.stripe.elements();
    this.card = this.elements.create('card');
    this.card.mount('#card-element');
  }

  async processPayment() {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.error('Error:', error);
    } else {
      const orderData = {
        token: token.id,
        address: this.address,
        items: this.cart.map(item => ({ id: item.id, quantity: item.quantity })),
        total: this.cart.reduce((total, product) => total + product.price * product.quantity, 0)
      };
      this.paymentService.processPayment(orderData).subscribe({
        next: (res) => console.log('Payment successful', res),
        error: (err) => console.error('Payment error:', err)
      });
    }
  }
}

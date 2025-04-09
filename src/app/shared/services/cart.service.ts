import { Injectable } from '@angular/core';
import { Medicine } from '../../models/Medicine';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartEntries: {
    [id: string]: { product: Medicine; quantity: number };
  } = {};

  addToCart(medicine: Medicine): void {
    if (this.cartEntries[medicine.id]) {
      this.cartEntries[medicine.id].quantity += 1;
    } else {
      this.cartEntries[medicine.id] = { product: medicine, quantity: 1 };
    }
  }

  getCartEntries() {
    return this.cartEntries;
  }

  getTotalPrice(): number {
    return Object.values(this.cartEntries).reduce(
      (sum, entry) => sum + entry.product.price * entry.quantity,
      0
    );
  }

  getTotalQuantity(): number {
    return Object.values(this.cartEntries).reduce(
      (sum, entry) => sum + entry.quantity,
      0
    );
  }

  removeFromCart(id: string): void {
    delete this.cartEntries[id];
  }

  clearCart(): void {
    this.cartEntries = {};
  }
}

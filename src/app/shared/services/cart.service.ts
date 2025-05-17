import { Injectable } from '@angular/core';
import { Medicine } from '../../models/Medicine';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  // Add a medicines property. You should populate this array as needed in your application.
  medicines: Medicine[] = [];

  private cartEntries: {
    [id: string]: { product: Medicine; quantity: number };
  } = {};

  async addToCart(medicine: Medicine): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    const userDocRef = doc(this.firestore, 'Users', user.uid);
    const userSnapshot = await getDoc(userDocRef);
    const userData = userSnapshot.data();

    const cart: { [id: string]: number } = userData?.['cart'] || {};
    if (cart[medicine.id]) {
      cart[medicine.id] += 1;
    } else {
      cart[medicine.id] = 1;
    }

    await updateDoc(userDocRef, { cart });
  }

  getMedicineById(id: string): Medicine | undefined {
    return this.medicines.find((med) => med.id === id);
  }

  async getCartEntries(): Promise<{
    [medicineID: string]: { product: Medicine; quantity: number };
  }> {
    const user = await this.authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    const userDocRef = doc(this.firestore, 'Users', user.uid);
    const userSnapshot = await getDoc(userDocRef);
    const userData = userSnapshot.data();

    // Feltételezzük, hogy a cart: { [medicineId: string]: number }
    const cart: { [id: string]: number } = userData?.['cart'] || {};

    // Töltsd ki a product adatokat is
    const cartEntries: {
      [id: string]: { product: Medicine; quantity: number };
    } = {};
    for (const id of Object.keys(cart)) {
      const medicine = this.getMedicineById(id);
      if (medicine) {
        cartEntries[id] = { product: medicine, quantity: cart[id] };
      }
    }
    return cartEntries;
  }

  async getTotalPrice(): Promise<number> {
    const cartEntries = await this.getCartEntries();
    return Object.values(cartEntries).reduce(
      (sum, entry) => sum + entry.product.price * entry.quantity,
      0
    );
  }

  async getTotalQuantity(): Promise<number> {
    const cartEntries = await this.getCartEntries();
    return Object.values(cartEntries).reduce(
      (sum, entry) => sum + entry.quantity,
      0
    );
  }

  async removeFromCart(id: string): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    const userDocRef = doc(this.firestore, 'Users', user.uid);
    const userSnapshot = await getDoc(userDocRef);
    const userData = userSnapshot.data();

    const cart: { [id: string]: number } = userData?.['cart'] || {};
    delete cart[id];

    await updateDoc(userDocRef, { cart });
  }

  async clearCart(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    const userDocRef = doc(this.firestore, 'Users', user.uid);
    await updateDoc(userDocRef, { cart: {} });
  }
}

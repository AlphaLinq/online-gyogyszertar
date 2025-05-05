import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProfileObjects } from '../../shared/constans';
import { CommonModule } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { Medicine } from '../../models/Medicine';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatCardModule, MatIconModule, CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @ViewChild('chosenProfile') chosenProfile!: ElementRef<HTMLSelectElement>;

  ProfileObject = ProfileObjects;
  id: number = 0;
  //totalPrice: number = 0;
  currentProfile = ProfileObjects[this.id];

  constructor(private cartService: CartService) {}

  get CartEntries(): { [id: string]: { product: Medicine; quantity: number } } {
    return this.cartService.getCartEntries();
  }

  get totalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  get totalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  removeItem(id: string): void {
    this.cartService.removeFromCart(id);
  }

  clearCart(): void {
    this.cartService.clearCart();
    console.log('JA AMÚGY MŰKÖDÖK NE IS TÖRÖDJ VELEM');
  }

  reload(event: any) {
    this.id = event.target.value - 1;
    this.currentProfile = this.ProfileObject[this.id];
  }
}

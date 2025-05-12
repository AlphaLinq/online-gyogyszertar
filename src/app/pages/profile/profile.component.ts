import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  OnInit,
} from '@angular/core';
import { ProfileObjects } from '../../shared/constans';
import { CommonModule } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { Medicine } from '../../models/Medicine';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';
import { User } from '../../models/User';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../../shared/services/user.service.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatCardModule, MatIconModule, CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  //@ViewChild('chosenProfile') chosenProfile!: ElementRef<HTMLSelectElement>;

  user: User | null = null;
  cart: Medicine[] = [];
  isLoading = true;

  private subscription: Subscription | null = null;

  ProfileObject = ProfileObjects;
  id: number = 0;
  currentProfile = ProfileObjects[this.id];

  constructor(
    private cartService: CartService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data.user;
        this.cart = data.cart;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Hiba a felhasználói profil betöltésekor:', error);
        this.isLoading = false;
      },
    });
  }

  getUserInitials(): string {
    if (!this.user || !this.user.name) return '?';

    const firstInitial = this.user.name.firstName
      ? this.user.name.firstName.charAt(0).toUpperCase()
      : '';
    const lastInitial = this.user.name.lastName
      ? this.user.name.lastName.charAt(0).toUpperCase()
      : '';

    return firstInitial + (lastInitial ? lastInitial : '');
  }

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

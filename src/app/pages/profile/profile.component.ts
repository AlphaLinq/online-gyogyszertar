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
import { MedicineService } from '../../shared/services/medicine.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatCardModule, MatIconModule, CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  isLoading = true;
  successMessage: string = '';

  // Kosár: tömb, amiben van termék + darabszám
  cartEntries: { product: Medicine; quantity: number }[] = [];

  private subscription: Subscription | null = null;

  constructor(
    private userService: UserServiceService,
    private medicineService: MedicineService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadUserProfileAndCart();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadUserProfileAndCart(): void {
    this.isLoading = true;

    this.subscription = this.userService.getUserProfile().subscribe({
      next: async (data) => {
        this.user = data.user;
        console.log('User profile:', this.user);

        // Lekérjük a cart map-et (medicineId → quantity)
        const cartMap = data.cart;
        console.log('Cart map:', cartMap);
        // Ha nincs semmi, ürítjük a cartEntries-t
        if (!cartMap || Object.keys(cartMap).length === 0) {
          this.cartEntries = [];
          this.isLoading = false;
          return;
        }

        // Lekérjük a gyógyszerek adatait az ID-k alapján
        const medicineIds = Object.keys(cartMap);
        const medicines = await this.medicineService.getMedicinesByIds(
          medicineIds
        );
        console.log('Medicines:', medicines);

        // Egyesítjük a termékeket a mennyiségekkel
        this.cartEntries = medicines.map((med) => ({
          product: med,
          quantity: cartMap[med.id] || 0,
        }));

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Hiba a profil betöltésekor:', err);
        this.isLoading = false;
      },
    });
  }

  clearSuccessMessage() {
    this.successMessage = '';
  }

  async removeItem(id: string): Promise<void> {
    await this.cartService.removeFromCart(id);
    await this.loadUserProfileAndCart();
  }

  async clearCart(): Promise<void> {
    await this.cartService.clearCart();
    this.successMessage = 'Kosár kiürítve';
    setTimeout(() => (this.successMessage = ''), 2000);
    await this.loadUserProfileAndCart();
  }

  get totalPrice(): number {
    return this.cartEntries.reduce(
      (acc, entry) => acc + entry.product.price * entry.quantity,
      0
    );
  }

  get totalQuantity(): number {
    return this.cartEntries.reduce((acc, entry) => acc + entry.quantity, 0);
  }

  getUserInitials(): string {
    if (!this.user || !this.user.name) return '?';
    const firstInitial = this.user.name.firstName
      ? this.user.name.firstName.charAt(0).toUpperCase()
      : '';
    const lastInitial = this.user.name.lastName
      ? this.user.name.lastName.charAt(0).toUpperCase()
      : '';
    return firstInitial + lastInitial;
  }

  async order() {
    await this.cartService.clearCart();
    this.successMessage = 'Megrendelés leadva';
    setTimeout(() => (this.successMessage = ''), 2000);
    await this.loadUserProfileAndCart();
  }
}

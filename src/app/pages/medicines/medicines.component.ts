import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterComponent } from '../../shared/filter/filter.component';
import { MedicineObjects } from '../../shared/const_medicines';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Medicine } from '../../models/Medicine';
import { CartService } from '../../shared/services/cart.service';
import { MedicineService } from '../../shared/services/medicine.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import {
  QueryDocumentSnapshot,
  DocumentData,
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  Firestore,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-medicines',
  imports: [FilterComponent, MatCardModule, MatGridListModule, MatIconModule],
  templateUrl: './medicines.component.html',
  styleUrl: './medicines.component.scss',
})
export class MedicinesComponent implements OnInit, OnDestroy {
  MedicineObject = MedicineObjects;
  filteredMedicines: Medicine[] = [];
  title: String = 'Gyógyszerek';
  private subscriptions: Subscription[] = [];
  private isLoading = false;
  allMedicines: Medicine[] = [];
  isLoggedIn = false;
  successMessage = '';
  sortOrder: string = 'price-asc';

  constructor(
    private cartService: CartService,
    private medicineService: MedicineService,
    private router: Router,
    private firestore: Firestore,
    private authService: AuthService
  ) {}
  addMedicine() {
    this.router.navigate(['/add-medicine']);
  }

  updateMedicine(medicine: Medicine) {
    this.router.navigate(['/update-medicine', medicine.id]);
  }

  addToCart(medicine: Medicine): void {
    this.cartService.addToCart(medicine);
    this.successMessage = 'Sikeresen hozzáadva a kosárhoz!';
    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
  }
  sortMedicines() {
    if (this.sortOrder === 'price-asc') {
      this.filteredMedicines.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'price-desc') {
      this.filteredMedicines.sort((a, b) => b.price - a.price);
    }
  }
  onSortChanged(order: string): void {
    this.sortOrder = order;
    this.sortMedicines();
  }

  loadAllMedicineData(): void {
    this.isLoading = true;

    const allMedicines$ = this.medicineService.getMedicines();
    const subscription = allMedicines$.subscribe({
      next: (allMedicines) => {
        this.allMedicines = allMedicines;
        this.filteredMedicines = allMedicines;
        this.sortMedicines();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching medicines:', error);
        this.isLoading = false;
      },
    });
    this.subscriptions.push(subscription);
  }

  onCategorySelected(category: string): void {
    if (category === 'all') {
      this.filteredMedicines = [...this.allMedicines];
    } else {
      this.filteredMedicines = this.allMedicines.filter(
        (medicine) => medicine.type === category
      );
    }
    this.sortMedicines();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
    this.loadAllMedicineData();
  }

  async getNextMedicinesPage(
    lastDoc: QueryDocumentSnapshot<DocumentData> | null
  ): Promise<Medicine[]> {
    const medicinesCollection = collection(this.firestore, 'Medicines');
    let q;
    if (lastDoc) {
      q = query(
        medicinesCollection,
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(10)
      );
    } else {
      q = query(medicinesCollection, orderBy('createdAt', 'desc'), limit(10));
    }
    const querySnapshot = await getDocs(q);
    const medicines: Medicine[] = [];
    querySnapshot.forEach((doc) => {
      medicines.push({ ...doc.data(), id: doc.id } as Medicine);
    });
    return medicines;
  }
}

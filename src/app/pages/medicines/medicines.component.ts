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

  constructor(
    private cartService: CartService,
    private medicineService: MedicineService
  ) {}

  addToCart(medicine: Medicine): void {
    this.cartService.addToCart(medicine);
  }

  loadAllMedicineData(): void {
    this.isLoading = true;

    const allMedicines$ = this.medicineService.getMedicines();
    const subscription = allMedicines$.subscribe({
      next: (allMedicines) => {
        this.allMedicines = allMedicines;
        this.filteredMedicines = allMedicines;
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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.loadAllMedicineData();
  }
}

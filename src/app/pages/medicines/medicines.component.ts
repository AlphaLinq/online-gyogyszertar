import { Component } from '@angular/core';
import { FilterComponent } from '../../shared/filter/filter.component';
import { MedicineObjects } from '../../shared/const_medicines';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Medicine } from '../../models/Medicine';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-medicines',
  imports: [FilterComponent, MatCardModule, MatGridListModule, MatIconModule],
  templateUrl: './medicines.component.html',
  styleUrl: './medicines.component.scss',
})
export class MedicinesComponent {
  MedicineObject = MedicineObjects;
  filteredMedicines = MedicineObjects;
  title: String = 'Gyógyszerek';

  constructor(private cartService: CartService) {}

  addToCart(medicine: Medicine): void {
    this.cartService.addToCart(medicine);
  }

  onCategorySelected(category: string): void {
    if (category === 'all') {
      this.filteredMedicines = this.MedicineObject;
    } else {
      this.filteredMedicines = this.MedicineObject.filter(
        (medicine) => medicine.type === category
      );
    }
  }
}

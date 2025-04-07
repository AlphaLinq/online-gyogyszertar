import { Component } from '@angular/core';
import { FilterComponent } from '../../shared/filter/filter.component';
import { MedicineObjects } from '../../shared/const_medicines';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-medicines',
  imports: [FilterComponent, NgFor, NgIf],
  templateUrl: './medicines.component.html',
  styleUrl: './medicines.component.scss',
})
export class MedicinesComponent {
  selectedCategory: string = '';
  MedicineObject = MedicineObjects;

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
  }
}

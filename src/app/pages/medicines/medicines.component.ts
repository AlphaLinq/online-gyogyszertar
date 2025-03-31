import { Component } from '@angular/core';
import { FilterComponent } from '../../shared/filter/filter.component';

@Component({
  selector: 'app-medicines',
  imports: [FilterComponent],
  templateUrl: './medicines.component.html',
  styleUrl: './medicines.component.scss',
})
export class MedicinesComponent {
  selectedCategory: string = '';

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
  }
}

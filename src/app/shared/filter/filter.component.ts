import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-filter',
  imports: [
    MatCardModule,
    MatRadioModule,
    MatFormField,
    MatLabel,
    MatSelectModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Output() sortChanged = new EventEmitter<string>();
  @Output() categorySelected = new EventEmitter<string>();

  onCategoryChange(category: string): void {
    this.categorySelected.emit(category);
  }

  onSortChange(sortOrder: string) {
    this.sortChanged.emit(sortOrder);
  }
}

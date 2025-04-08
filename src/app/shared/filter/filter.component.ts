import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-filter',
  imports: [MatCardModule, MatRadioModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Output() categorySelected = new EventEmitter<string>();

  onCategoryChange(category: string): void {
    this.categorySelected.emit(category);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Output() categorySelected = new EventEmitter<string>();

  onCategoryChange(category: string): void {
    this.categorySelected.emit(category);
    console.log('Működök!');
  }
}

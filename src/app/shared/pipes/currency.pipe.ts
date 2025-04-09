import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyChange',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  transform(value: Number): string {
    if (!value) return '';
    return value + ' Ft';
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, AfterViewInit {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const defaultPage = 'home';
    this.setIndicatorPosition(defaultPage);
  }
  menuSwitch(pageValue: string): void {
    this.selectedPage.emit(pageValue);
    this.setIndicatorPosition(pageValue);
  }

  private setIndicatorPosition(pageValue: string): void {
    const items = this.el.nativeElement.querySelectorAll('.nav-item');
    const indicator = this.el.nativeElement.querySelector('.nav-indicator');

    items.forEach((item: HTMLElement) => {
      if (item.textContent?.trim().toLowerCase() === pageValue.toLowerCase()) {
        const { offsetLeft, offsetWidth } = item;
        this.renderer.setStyle(indicator, 'left', `${offsetLeft}px`);
        this.renderer.setStyle(indicator, 'width', `${offsetWidth}px`);
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });
  }
}

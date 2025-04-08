import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatNavList } from '@angular/material/list';

import {
  NavigationEnd,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLinkActive, RouterLink, MatIconModule, MatListModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() isLoggedIn!: boolean;

  @ViewChild('indicator') indicator!: ElementRef;
  @Output() logoutEvent = new EventEmitter<void>();

  ngAfterViewInit(): void {
    this.setActive('home');
  }

  setActive(menuItem: string): void {
    const activeElement = document.querySelector(
      `li.nav-item#${menuItem}`
    ) as HTMLElement;

    if (activeElement && this.indicator) {
      const indicatorEl = this.indicator.nativeElement as HTMLElement;
      const { offsetLeft, offsetWidth } = activeElement;

      console.log('OffsetLeft:', offsetLeft);
      console.log('OffsetWidth:', offsetWidth);

      indicatorEl.style.transform = `translateX(${offsetLeft}px)`;
      indicatorEl.style.width = `${offsetWidth}px`;
    }
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/home';
  }
}

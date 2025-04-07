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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
  NavigationEnd,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuOpen: any;
  toggleMenu() {
    throw new Error('Method not implemented.');
  }
  @ViewChild('indicator') indicator!: ElementRef;

  ngAfterViewInit(): void {
    this.setActive('home');
  }

  setActive(menuItem: string): void {
    const activeElement = document.querySelector(
      `li.nav-item#${menuItem}`
    ) as HTMLElement;

    console.log('Active: ', activeElement);
    console.log(`Selector: li.nav-item#${menuItem}`);
    console.log('Indikátor: ', this.indicator);

    if (activeElement && this.indicator) {
      const indicatorEl = this.indicator.nativeElement as HTMLElement;
      const { offsetLeft, offsetWidth } = activeElement;

      console.log('OffsetLeft:', offsetLeft);
      console.log('OffsetWidth:', offsetWidth);

      indicatorEl.style.transform = `translateX(${offsetLeft}px)`;
      indicatorEl.style.width = `${offsetWidth}px`;
    }
  }
}

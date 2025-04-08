import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from '../menu/menu.component';
import { MatNavList } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatNavList,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();

  constructor() {
    console.log('constructor called');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
  }

  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/home';
    this.closeMenu();
  }
}

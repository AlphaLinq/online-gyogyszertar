import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgIf } from '@angular/common';
import { MenuComponent } from './shared/menu/menu.component';
import { MedicinesComponent } from './pages/medicines/medicines.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MobileMenuComponent } from './shared/mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HomeComponent,
    MenuComponent,
    NgIf,
    MedicinesComponent,
    ProfileComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MobileMenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isMobile = false;
  isLoggedIn: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkViewport();
  }

  constructor() {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    window.location.href = '/home';
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  private checkViewport() {
    this.isMobile = window.innerWidth <= 768; // Mobil nézet, ha az ablak szélessége <= 768px
  }
}

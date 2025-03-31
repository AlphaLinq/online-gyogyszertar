import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgIf } from '@angular/common';
import { MenuComponent } from './shared/menu/menu.component';
import { MedicinesComponent } from './pages/medicines/medicines.component';
import { ProfileComponent } from './pages/profile/profile.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HomeComponent,
    MenuComponent,
    NgIf,
    MedicinesComponent,
    ProfileComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  page = 'home';
  changePage(event: string) {
    this.page = event;
  }
  title = 'online-gyogyszertar';
}

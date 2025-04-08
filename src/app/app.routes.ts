import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MedicinesComponent } from './pages/medicines/medicines.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'medicines',
    loadComponent: () =>
      import('./pages/medicines/medicines.component').then(
        (m) => m.MedicinesComponent
      ),
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: '**',
    loadComponent: () =>
      import('./shared/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];

/*
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}*/

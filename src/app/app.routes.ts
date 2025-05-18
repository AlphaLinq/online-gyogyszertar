import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/guards/auth/auth.guard';

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
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [publicGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
    canActivate: [publicGuard],
  },
  {
    path: 'add-medicine',
    loadComponent: () =>
      import('./pages/addmedicine/addmedicine.component').then(
        (m) => m.AddmedicineComponent
      ),
  },
  {
    path: 'update-medicine/:id',
    loadComponent: () =>
      import('./pages/updatemedicine/updatemedicine.component').then(
        (m) => m.UpdatemedicineComponent
      ),
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

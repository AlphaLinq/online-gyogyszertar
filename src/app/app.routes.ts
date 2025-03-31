import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MedicinesComponent } from './pages/medicines/medicines.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },

  /*{
    path: 'medicines',
    loadComponent: () =>
      import('./pages/medicines/medicines.component').then(
        (m) => m.MedicinesComponent
      ),
  },*/
  { path: 'medicines', component: MedicinesComponent },

  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

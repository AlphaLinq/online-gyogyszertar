import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { ProfileObjects } from '../../shared/constans';
import { NgFor } from '@angular/common';
import { MedicineObjects } from '../../shared/const_medicines';

@Component({
  selector: 'app-profile',
  imports: [NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @ViewChild('chosenProfile') chosenProfile!: ElementRef<HTMLSelectElement>;

  ProfileObject = ProfileObjects;
  id: number = 0;
  cartEntries: [string, number][] = [];
  totalPrice: number = 0;
  currentProfile = ProfileObjects[this.id];

  reload(event: any) {
    this.id = event.target.value - 1;
    const value = (event.target as HTMLSelectElement).value;
    this.currentProfile = this.ProfileObject[this.id];
    this.updateCart();
    console.log('Current: ' + this.totalPrice);
  }

  updateCart(): void {
    this.cartEntries = Object.entries(this.currentProfile.cart);
    this.totalPrice = this.cartEntries.reduce((sum, [itemName, quantity]) => {
      const match = MedicineObjects.find((med) =>
        med.name.toLowerCase().includes(itemName.toLowerCase())
      );
      return sum + (match ? +match.price * quantity : 0);
    }, 0);
  }

  ngOnInit(): void {
    this.cartEntries = Object.entries(this.ProfileObject[this.id]?.cart || {});
  }
}

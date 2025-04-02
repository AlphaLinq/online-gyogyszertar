import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { ProfileObjects } from '../../shared/constans';
import { NgFor } from '@angular/common';

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
  basketEntries: [string, number][] = [];

  reload(event: any) {
    this.id = event.target.value - 1;
    console.log('pnésiz: ' + this.id);
  }

  ngOnInit(): void {
    this.basketEntries = Object.entries(
      this.ProfileObject[this.id]?.basket || {}
    );
  }
}

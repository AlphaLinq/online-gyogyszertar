import { Component } from '@angular/core';
import { MedicineService } from '../../shared/services/medicine.service';
import { Medicine } from '../../models/Medicine';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-addmedicine',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule, // Importáljuk a MatOptionModule-t is
  ],
  templateUrl: './addmedicine.component.html',
  styleUrl: './addmedicine.component.scss',
})
export class AddmedicineComponent {
  medicine: Partial<Medicine> = {};
  imageFile: File | null = null;
  imagePreview: string | null = null;

  medicineTypes = [
    { value: 'painkillers', label: 'Fájdalomcsillapító' },
    { value: 'antibiotics', label: 'Antibiotikum' },
    { value: 'vitamins', label: 'Vitamin' },
    { value: 'anti-fever', label: 'Megfázás elleni' },
    { value: 'anti-inflammatory', label: 'Gyulladáscsökkentő' },
    { value: 'cough-suppressant', label: 'Köhögéscsillapító' },
    { value: 'digestive-aid', label: 'Emésztést segítő' },
    { value: 'probiotic', label: 'Probiotikum' },
    { value: 'other', label: 'Egyéb' },
  ];

  constructor(
    private medicineService: MedicineService,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];

      // Előnézet
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  async onSubmit() {
    if (
      !this.medicine.name ||
      !this.medicine.price ||
      !this.medicine.type ||
      !this.medicine.description
    ) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }

    // Kép kezelése: ha van kép, feltöltheted storage-ba, most csak base64-et mentünk
    let imageURL = '';
    if (this.imagePreview) {
      imageURL = this.imagePreview;
    }

    const newMedicine = {
      name: this.medicine.name,
      price: Number(this.medicine.price),
      type: this.medicine.type,
      description: this.medicine.description,
      imgURL: imageURL,
    };

    try {
      await this.medicineService.addMedicine(newMedicine);
      alert('Gyógyszer sikeresen hozzáadva!');
      this.router.navigate(['/medicines']);
    } catch (err) {
      alert('Hiba történt: ' + err);
    }
  }
}

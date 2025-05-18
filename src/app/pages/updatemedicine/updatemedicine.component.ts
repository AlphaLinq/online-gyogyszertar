import { Component, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Medicine } from '../../models/Medicine';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from '../../shared/services/medicine.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-updatemedicine',
  imports: [
    MatFormField,
    MatInputModule,
    MatLabel,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './updatemedicine.component.html',
  styleUrl: './updatemedicine.component.scss',
})
export class UpdatemedicineComponent implements OnInit {
  medicine: Partial<Medicine> = {};
  imageFile: File | null = null;
  imagePreview: string | null = null;
  medicineTypes = [
    { value: 'painkillers', label: 'Fájdalomcsillapító' },
    { value: 'antibiotics', label: 'Antibiotikum' },
    { value: 'vitamins', label: 'Vitamin' },
    { value: 'other', label: 'Egyéb' },
  ];

  constructor(
    private route: ActivatedRoute,
    private medicineService: MedicineService,
    private router: Router
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const meds = await this.medicineService.getMedicinesByIds([id]);
      const med = meds[0];
      if (med) {
        this.medicine = { ...med };
        this.imagePreview = med.imgURL || '';
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  async onSubmit() {
    console.log('Küldés...');
    if (
      !this.medicine.id ||
      !this.medicine.name ||
      !this.medicine.price ||
      !this.medicine.type ||
      !this.medicine.description
    ) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }

    let imageURL = this.imagePreview || this.medicine.imgURL || '';

    const updatedMedicine: Medicine = {
      ...this.medicine,
      price: Number(this.medicine.price),
      imgURL: imageURL,
    } as Medicine;

    try {
      await this.medicineService.updateMedicine(updatedMedicine, {
        name: updatedMedicine.name,
        price: updatedMedicine.price,
        type: updatedMedicine.type,
        description: updatedMedicine.description,
        imgURL: updatedMedicine.imgURL,
      });
      alert('Gyógyszer sikeresen frissítve!');
      this.router.navigate(['/medicines']);
    } catch (err) {
      alert('Hiba történt: ' + err);
    }
  }
}

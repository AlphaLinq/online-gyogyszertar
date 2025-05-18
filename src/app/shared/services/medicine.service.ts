import { Injectable } from '@angular/core';
import {
  doc,
  collection,
  Firestore,
  getDocs,
  updateDoc,
  query,
  where,
  deleteDoc,
  getDoc,
  addDoc,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, switchMap, of, from, map } from 'rxjs';
import { Medicine } from '../../models/Medicine';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private readonly MEDICINES_COLLECTION = 'Medicines';

  constructor(private firestore: Firestore, private authService: AuthService) {}

  // CREATE
  async addMedicine(medicine: Omit<Medicine, 'id'>): Promise<Medicine> {
    try {
      const medicinesCollectionRef = collection(
        this.firestore,
        this.MEDICINES_COLLECTION
      );
      const docRef = await addDoc(medicinesCollectionRef, medicine);
      const newMedicine = { ...medicine, id: docRef.id } as Medicine;
      return newMedicine;
    } catch (error) {
      console.error('Error adding medicine:', error);
      throw error;
    }
  }

  async getMedicinesByIds(medicineIds: string[]): Promise<Medicine[]> {
    if (!medicineIds || medicineIds.length === 0) return [];

    const promises = medicineIds.map(async (id) => {
      const docRef = doc(this.firestore, this.MEDICINES_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as Medicine;
        return { ...data, id: docSnap.id };
      }
      return null;
    });

    const results = await Promise.all(promises);
    return results.filter((med): med is Medicine => med !== null);
  }

  // READ
  getMedicines(): Observable<Medicine[]> {
    const medicineCollection = collection(
      this.firestore,
      this.MEDICINES_COLLECTION
    );

    return from(getDocs(medicineCollection)).pipe(
      map((querySnapshot) => {
        const medicines: Medicine[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Medicine;
          medicines.push({ ...data, id: doc.id });
        });
        return medicines;
      })
    );
  }

  //UPDATE
  async updateMedicine(
    medicine: Medicine,
    updateData: Partial<Medicine>
  ): Promise<void> {
    const medicineToUpdate: any = { ...updateData };
    const medicineRef = doc(
      this.firestore,
      this.MEDICINES_COLLECTION,
      medicine.id
    );
    return updateDoc(medicineRef, medicineToUpdate);
  }

  //DELETE
  async deleteMedicine(medicine: Medicine): Promise<void> {
    const medicineRef = doc(
      this.firestore,
      this.MEDICINES_COLLECTION,
      medicine.id
    );
    await deleteDoc(medicineRef);
    console.log('Medicine deleted:', medicine.id);
  }
}

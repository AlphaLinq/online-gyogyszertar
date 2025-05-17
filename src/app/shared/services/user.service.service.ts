import { Injectable } from '@angular/core';
import {
  Firestore,
  query,
  doc,
  getDoc,
  collection,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, switchMap, from, of } from 'rxjs';
import { User } from '../../models/User';
import { Medicine } from '../../models/Medicine';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  getUserProfile(): Observable<{
    user: User | null;
    cart: { [medicineId: string]: number };
  }> {
    return this.authService.currentUser.pipe(
      switchMap((authUser) => {
        if (!authUser) {
          return of({
            user: null,
            cart: {},
          });
        }
        return from(this.fetchUserWithCart(authUser.uid));
      })
    );
  }

  private async fetchUserWithCart(uid: string): Promise<{
    user: User | null;
    cart: { [medicineId: string]: number };
  }> {
    try {
      const userDocRef = doc(this.firestore, 'Users', uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return {
          user: null,
          cart: {},
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: uid };

      const cartMap: { [medicineId: string]: number } = user.cart ?? {};

      const medicineIds = Object.keys(cartMap);
      if (medicineIds.length === 0) {
        return {
          user,
          cart: {},
        };
      }

      const medicinesCollection = collection(this.firestore, 'Medicines');
      const medicines: Medicine[] = [];

      const chunkSize = 10; // Firestore limit for "in" queries

      for (let i = 0; i < medicineIds.length; i += chunkSize) {
        const chunk = medicineIds.slice(i, i + chunkSize);
        const q = query(medicinesCollection, where('__name__', 'in', chunk));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Medicine;
          const medicineId = doc.id;
          const quantity = cartMap[medicineId];

          medicines.push({
            ...data,
            id: medicineId,
            quantity, // ⬅️ quantity from cart map
          });
        });
      }

      return {
        user,
        cart: cartMap,
      };
    } catch (error) {
      console.error('Error fetching user or cart data:', error);
      return {
        user: null,
        cart: {},
      };
    }
  }
}

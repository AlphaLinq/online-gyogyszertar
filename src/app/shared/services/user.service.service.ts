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
    cart: Medicine[];
  }> {
    return this.authService.currentUser.pipe(
      switchMap((authUser) => {
        if (!authUser) {
          return of({
            user: null,
            cart: [],
          });
        }
        return from(this.fetchUserWithCart(authUser.uid));
      })
    );
  }

  private async fetchUserWithCart(uid: string): Promise<{
    user: User | null;
    cart: Medicine[];
  }> {
    try {
      const userDocRef = doc(this.firestore, 'Users', uid);
      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) {
        return {
          user: null,
          cart: [],
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: uid };

      if (!user.cart || user.cart.length === 0) {
        return {
          user,
          cart: [],
        };
      }

      // Fetch the cart items for the user
      const cartCollection = collection(this.firestore, 'Carts');
      const q = query(cartCollection, where('userId', 'in', user.cart));
      const cartSnapshot = await getDocs(q);

      const carts: Medicine[] = [];
      cartSnapshot.forEach((doc) => {
        carts.push({ ...doc.data(), id: doc.id } as Medicine);
      });

      return {
        user,
        cart: carts,
      };
    } catch (error) {
      console.error('Error fetching user or cart data:', error);
      return {
        user: null,
        cart: [],
      };
    }
  }
}

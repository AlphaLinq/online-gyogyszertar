import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  User as FirebaseUser,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, signOut } from '@firebase/auth';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: Observable<FirebaseUser | null>;

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    this.currentUser = authState(this.auth);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    });
  }

  async getCurrentUser(): Promise<FirebaseUser | null> {
    return await firstValueFrom(this.currentUser);
  }

  async signUp(
    email: string,
    password: string,
    userData: Partial<User>
  ): Promise<UserCredential> {
    try {
      const UserCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      await this.createUserData(UserCredential.user.uid, {
        ...userData,
        id: UserCredential.user.uid,
        email: email,
        cart: {},
      });

      return UserCredential;
    } catch (error) {
      console.error('Hiba a regisztáció során', error);
      throw error;
    }
  }

  private async createUserData(
    userId: string,
    userData: Partial<User>
  ): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Users'), userId);

    return setDoc(userRef, userData);
  }

  isLoggedIn(): Observable<FirebaseUser | null> {
    return this.currentUser;
  }

  updateLogInStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
}

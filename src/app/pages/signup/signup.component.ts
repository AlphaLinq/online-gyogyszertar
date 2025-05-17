import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/User';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    }),
  });

  isLoading = false;
  showForm = true;
  signupError = '';
  id: number = 2;

  constructor(private router: Router, private authService: AuthService) {}

  signup() {
    if (this.signUpForm.invalid) {
      this.signupError = 'Légyszi javítsd ki a hibákat.';
      return;
    }

    const password = this.signUpForm.get('password');
    const rePassword = this.signUpForm.get('rePassword');

    if (password?.value !== rePassword?.value) {
      this.signupError = 'A két jelszó nem egyezik.';
    }

    this.isLoading = true;
    this.showForm = false;

    const userData: Partial<User> = {
      name: {
        firstName: this.signUpForm.value.name?.firstname || '',
        lastName: this.signUpForm.value.name?.lastname || '',
      },
      email: this.signUpForm.value.email || '',
      cart: {},
    };

    const email = this.signUpForm.value.email || '';
    const pw = this.signUpForm.value.password || '';

    this.authService
      .signUp(email, pw, userData)
      .then((userCredential) => {
        console.log('User signed up successfully:', userCredential);
        this.authService.updateLogInStatus(true);
        this.router.navigateByUrl('home');
      })
      .catch((error) => {
        console.error('Regisztrációs hiba: ', error);
        this.isLoading = false;
        this.showForm = true;

        switch (error.code) {
          case 'auth/email-already-in-use':
            this.signupError = 'Ez az email cím már használatban van.';
            break;
          case 'auth/invalid-email':
            this.signupError = 'Érvénytelen email cím.';
            break;
          case 'auth/weak-password':
            this.signupError = 'A jelszó túl gyenge.';
            break;
          default:
            this.signupError = 'Ismeretlen hiba történt.';
        }
      });
  }
}

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
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    RouterLinkActive,
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

  constructor(private router: Router) {}

  signup() {
    if (this.signUpForm.invalid) {
      this.signupError = 'Légyszi javítsd ki a hibákat.';
      return;
    }

    const password = this.signUpForm.get('password');
    const rePassword = this.signUpForm.get('rePassword');

    if (password?.value !== rePassword?.value) {
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const newUser: User = {
      id: this.id,
      name: {
        firstName: this.signUpForm.value.name?.firstname || '',
        lastName: this.signUpForm.value.name?.lastname || '',
      },
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
      cart: [],
    };

    this.id += 1;

    console.log('New User: ', newUser);
    console.log('Form value: ', this.signUpForm.value);

    localStorage.setItem('isLoggedIn', 'true');
    setTimeout(() => {
      this.router.navigateByUrl('home');
    }, 2000);
  }
}

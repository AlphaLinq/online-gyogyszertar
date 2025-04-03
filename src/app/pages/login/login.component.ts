import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  loginError: string = '';
  isLoading: boolean = false;
  showLoginForm: boolean = true;

  constructor() {}

  logIn() {
    this.loginError = '';

    if (
      this.email.value === 'test@gmail.com' &&
      this.password.value === 'testpw'
    ) {
      this.isLoading = true;
      this.showLoginForm = false;

      localStorage.setItem('isLoggedIn', 'true');

      setTimeout(() => {
        window.location.href = '/home';
      }, 3000);
    } else {
      this.loginError = 'Invalid email or password!';
    }
  }
}

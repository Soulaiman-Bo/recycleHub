import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthError, selectIsAuthenticated } from '../../../store/auth/auth.selectors';
import * as AuthActions from '../../../store/auth/auth.actions';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private authSubscription!: Subscription;

  loginForm: FormGroup;
  authError$ = this.store.select(selectAuthError);
  isAuthenticated$ = this.store.select(selectIsAuthenticated); // Track auth status

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.authSubscription = this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        setTimeout(() => this.router.navigate(['/']), 1500);
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(AuthActions.login({ email, password }));
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}

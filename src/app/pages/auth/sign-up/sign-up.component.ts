import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../../store/auth/auth.selectors';
import * as AuthActions from '../../../store/auth/auth.actions';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private successSubscription!: Subscription;

  signUpForm: FormGroup;

  loading$ = this.store.select(AuthSelectors.selectAuthLoading);
  error$ = this.store.select(AuthSelectors.selectAuthError);
  success$ = this.store.select(AuthSelectors.selectIsSaved);

  constructor(private fb: FormBuilder, private router: Router) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      role: ['individual'], 
    });
  }

  ngOnInit(): void {
    this.successSubscription = this.success$.subscribe((success) => {
      if (success) {
        this.signUpForm.reset();
        this.router.navigate(['/auth/login'])
      }
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.store.dispatch(AuthActions.resetSignUpState()); // Reset before new signup attempt
      this.store.dispatch(AuthActions.signUp(this.signUpForm.value));
    }
  }

  ngOnDestroy(): void {
    if (this.successSubscription) {
      this.successSubscription.unsubscribe();
    }
  }
}

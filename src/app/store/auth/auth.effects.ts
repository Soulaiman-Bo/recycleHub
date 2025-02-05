import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap((action) => {
        try {
          const mockUser = {
            id: Math.random().toString(36).substr(2, 9),
            username: action.username,
            email: action.email,
            password: action.password,
          };

          localStorage.setItem('user', JSON.stringify(mockUser));
          
          return of(AuthActions.signUpSuccess({ user: mockUser }));
        } catch (error) {
          return of(AuthActions.signUpFailure({
            error: error instanceof Error ? error.message : 'An unknown error occurred'
          }));
        }
      }),
      catchError((error) => of(AuthActions.signUpFailure({
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      })))
    )
  );


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {

        const storedUsers = localStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const user = users.find(
          (u: any) => u.email === action.email && u.password === action.password
        );

        if (user) {
          return of(AuthActions.loginSuccess({ user }));
        } else {
          return of(AuthActions.loginFailure({ error: 'Invalid email or password' }));
        }

      }),
      catchError((error) =>
        of(AuthActions.loginFailure({ error: 'An error occurred while logging in' }))
      )
    )
  );
}



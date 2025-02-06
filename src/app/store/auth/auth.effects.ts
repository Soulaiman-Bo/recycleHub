import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap((action) =>
        this.authService.signUp(action.username, action.email, action.password).pipe(
          map((user) => AuthActions.signUpSuccess({ user })),
          catchError((error) => of(AuthActions.signUpFailure({ error: error.message })))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((user) =>
            user ? AuthActions.loginSuccess({ user }) : AuthActions.loginFailure({ error: 'Invalid email or password' })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );
}

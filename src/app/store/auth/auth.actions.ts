import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ username: string; email: string; password: string; role?: string, address: string, city: string  }>()
);


export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ user: User }>()
);

export const signUpFailure = createAction(
  '[Auth] Sign Up Failure',
  props<{ error: string }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const resetSignUpState = createAction('[Auth] Reset Sign Up State');

export const logout = createAction('[Auth] Logout');

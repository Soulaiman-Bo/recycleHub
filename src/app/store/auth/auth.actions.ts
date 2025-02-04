
import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';


export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ username: string; email: string; password: string }>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ user: User }>()
);

export const signUpFailure = createAction(
  '[Auth] Sign Up Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');


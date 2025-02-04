import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../core/models/auth.model';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signUp, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.signUpSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),

  on(AuthActions.signUpFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  on(AuthActions.logout, () => initialState)
);

import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../core/models/auth.model';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isSaved: null,
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
    isSaved: true,
    loading: false,
    error: null,
  })),

  on(AuthActions.resetSignUpState, (state) => ({
    ...state,
    isSaved: null,
  })),


  on(AuthActions.signUpFailure, (state, { error }) => ({
    ...state,
    loading: false,
    isSaved: false,
    error,
  })),

  on(AuthActions.logout, () => initialState),

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

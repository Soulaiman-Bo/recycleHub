import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../core/models/auth.model';
import * as AuthActions from './auth.actions';

const savedUser = localStorage.getItem('user');

export const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser,
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

  on(AuthActions.logout, () => {
    localStorage.removeItem('user');
    return {
      user: null,
      isAuthenticated: false,
      isSaved: null,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user }) => {
    localStorage.setItem('user', JSON.stringify(user));
    return {
      ...state,
      user,
      isAuthenticated: true,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from '../core/models/auth.model';
import { authReducer } from './auth/auth.reducer';
import {
  collectionsReducer,
  CollectionsState,
} from './collection/collections.reducer';

export interface AppState {
  auth: AuthState;
  collections: CollectionsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  collections: collectionsReducer,
};

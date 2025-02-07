import { createReducer, on } from '@ngrx/store';
import { Collection } from '../../core/models/Collection.model';
import {
  createCollection,
  createCollectionSuccess,
  createCollectionFailure
} from './collections.actions';

export interface CollectionsState {
  collections: Collection[];
  loading: boolean;
  error: any;
}

export const initialState: CollectionsState = {
  collections: [],
  loading: false,
  error: null
};

export const collectionsReducer = createReducer(
  initialState,

  // When creating a collection, set loading to true
  on(createCollection, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  // When creation is successful, add the new collection to the list
  on(createCollectionSuccess, (state, { collection }) => ({
    ...state,
    collections: [...state.collections, collection],
    loading: false,
    error: null
  })),

  // When creation fails, set an error
  on(createCollectionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

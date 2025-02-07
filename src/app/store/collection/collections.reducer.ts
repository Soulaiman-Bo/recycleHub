import { createReducer, on } from '@ngrx/store';
import { Collection } from '../../core/models/Collection.model';
import {
  createCollection, createCollectionSuccess, createCollectionFailure,
  getCollections, getCollectionsSuccess, getCollectionsFailure
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

  on(createCollection, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(createCollectionSuccess, (state, { collection }) => ({
    ...state,
    collections: [...state.collections, collection],
    loading: false,
    error: null
  })),
  on(createCollectionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Get
  on(getCollections, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(getCollectionsSuccess, (state, { collections }) => ({
    ...state,
    collections,
    loading: false,
    error: null
  })),
  on(getCollectionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectionsState } from './collections.reducer';

// Feature key for the collections slice
export const selectCollectionsState = createFeatureSelector<CollectionsState>('collections');

// Example selector to get the array of collections
export const selectAllCollections = createSelector(
  selectCollectionsState,
  (state) => state.collections
);

// Example selector to get loading status
export const selectCollectionsLoading = createSelector(
  selectCollectionsState,
  (state) => state.loading
);

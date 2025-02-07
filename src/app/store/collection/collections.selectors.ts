import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectionsState } from './collections.reducer';
import { selectUser } from '../auth/auth.selectors';

export const selectCollectionsState =
  createFeatureSelector<CollectionsState>('collections');

export const selectAllCollections = createSelector(
  selectCollectionsState,
  (state) => state.collections
);

export const selectCollectionsForCurrentUser = createSelector(
  selectAllCollections,
  selectUser,
  (collections, user) => {
    if (!user?.id) return [];
    return collections.filter((c) => c.userId === user.id);
  }
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectionsState } from './collections.reducer';
import { selectUser } from '../auth/auth.selectors';
import { CollectionStatus } from '../../core/models/Collection.model';

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

export const selectPendingCollectionsForCollector = createSelector(
  selectAllCollections,
  selectUser,
  (collections, user) => {
    if (!user?.city) return [];

    return collections.filter(
      (c) =>
        c.status === CollectionStatus.PENDING &&
        c.city === user.city &&
        c.userId !== user.id
    );
  }
);

export const selectAcceptedCollectionsForCollector = createSelector(
  selectAllCollections,
  selectUser,
  (collections, user) => {
    if (!user?.city) return [];

    let cols =  collections.filter(
      (c) =>
        c.collectorId === user.id
    );

    console.log({cols});

    return cols
  }
);


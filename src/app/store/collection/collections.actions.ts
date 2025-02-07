import { createAction, props } from '@ngrx/store';
import { Collection } from '../../core/models/Collection.model';

// Action to create a new collection
export const createCollection = createAction(
  '[Collections] Create Collection',
  props<{ collection: Collection }>()
);

// Dispatched when creation is successful
export const createCollectionSuccess = createAction(
  '[Collections] Create Collection Success',
  props<{ collection: Collection }>()
);

// Dispatched on failure
export const createCollectionFailure = createAction(
  '[Collections] Create Collection Failure',
  props<{ error: any }>()
);

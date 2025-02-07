import { createAction, props } from '@ngrx/store';
import { Collection } from '../../core/models/Collection.model';

// Already existing actions for create
export const createCollection = createAction('[Collections] Create Collection', props<{ collection: Collection }>());
export const createCollectionSuccess = createAction('[Collections] Create Collection Success', props<{ collection: Collection }>());
export const createCollectionFailure = createAction('[Collections] Create Collection Failure', props<{ error: any }>());

// New actions for fetching all collections
export const getCollections = createAction('[Collections] Get Collections');
export const getCollectionsSuccess = createAction('[Collections] Get Collections Success', props<{ collections: Collection[] }>());
export const getCollectionsFailure = createAction('[Collections] Get Collections Failure', props<{ error: any }>());

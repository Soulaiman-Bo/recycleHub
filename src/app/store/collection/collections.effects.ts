import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CollectionService } from '../../core/services/collection.service';
import {
  createCollection,
  createCollectionSuccess,
  createCollectionFailure,
  getCollections,
  getCollectionsSuccess,
  getCollectionsFailure,
  updateCollection,
  updateCollectionSuccess,
  updateCollectionFailure,
  deleteCollection,
  deleteCollectionSuccess,
  deleteCollectionFailure,
} from './collections.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CollectionsEffects {
  private actions$ = inject(Actions);
  private collectionService = inject(CollectionService);

  createCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCollection),
      mergeMap(({ collection }) =>
        this.collectionService.createCollection(collection).pipe(
          map((createdCollection) =>
            createCollectionSuccess({ collection: createdCollection })
          ),
          catchError((error) => of(createCollectionFailure({ error })))
        )
      )
    )
  );

  // New effect for fetching the collections
  getCollections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCollections),
      mergeMap(() =>
        this.collectionService.getCollections().pipe(
          map((collections) => getCollectionsSuccess({ collections })),
          catchError((error) => of(getCollectionsFailure({ error })))
        )
      )
    )
  );

  updateCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCollection),
      mergeMap(({ collection }) =>
        this.collectionService.updateCollection(collection).pipe(
          map((updated) => updateCollectionSuccess({ collection: updated })),
          catchError((error) => of(updateCollectionFailure({ error })))
        )
      )
    )
  );


  deleteCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCollection),
      mergeMap(({ id }) =>
        this.collectionService.deleteCollection(id).pipe(
          map(() => deleteCollectionSuccess({ id })),
          catchError((error) => of(deleteCollectionFailure({ error })))
        )
      )
    )
  );

}

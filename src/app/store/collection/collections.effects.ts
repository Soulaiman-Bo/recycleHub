import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CollectionService } from '../../core/services/collection.service';
import {
  createCollection,
  createCollectionSuccess,
  createCollectionFailure
} from './collections.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CollectionsEffects {
  collectionService = inject(CollectionService)
  actions$ = inject(Actions)



  constructor(
  ) {}

  createCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCollection),
      mergeMap(({ collection }) =>
        this.collectionService.createCollection(collection).pipe(
          map((createdCollection) => createCollectionSuccess({ collection: createdCollection })),
          catchError((error) => of(createCollectionFailure({ error })))
        )
      )
    )
  );
}

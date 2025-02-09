import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Collection,
  CollectionStatus,
} from '../../../core/models/Collection.model';
import { Store } from '@ngrx/store';
import { selectPendingCollectionsForCollector } from '../../../store/collection/collections.selectors';
import { selectUser } from '../../../store/auth/auth.selectors';
import {
  getCollections,
  updateCollection,
} from '../../../store/collection/collections.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collector-collection-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collector-collection-table.component.html',
})
export class CollectorCollectionTableComponent {
  private store = inject(Store);

  collections$!: Observable<Collection[]>;
  currentUserId$!: string;

  ngOnInit(): void {
    this.store.dispatch(getCollections());
    this.collections$ = this.store.select(selectPendingCollectionsForCollector);

    this.store.select(selectUser).subscribe((user) => {
      if (user) {
        this.currentUserId$ = user.id!;
      }
    });
  }

  getWasteTypesString(collection: Collection): string {
    return collection.wasteItems?.map((item) => item.type).join(', ') || 'N/A';
  }

  getTotalWeight(collection: Collection): number {
    return (
      collection.wasteItems?.reduce((sum, item) => sum + item.weight, 0) || 0
    );
  }

  acceptCollection(collection: Collection) {
    const updatedCollection: Collection = {
      ...collection,
      status: CollectionStatus.ACCEPTED,
      collectorId: this.currentUserId$,
    };
    this.store.dispatch(updateCollection({ collection: updatedCollection }));
  }

  rejectCollection(collection: Collection) {
    const updatedCollection: Collection = {
      ...collection,
      status: CollectionStatus.REJECTED,
      collectorId: this.currentUserId$,
    };
    this.store.dispatch(updateCollection({ collection: updatedCollection }));
  }
}

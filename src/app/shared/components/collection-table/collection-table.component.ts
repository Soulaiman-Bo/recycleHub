import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Collection } from '../../../core/models/Collection.model';
import { selectCollectionsForCurrentUser } from '../../../store/collection/collections.selectors';
import { deleteCollection, getCollections } from '../../../store/collection/collections.actions';
import { calculatePoints } from '../../utils/points.util';

@Component({
  selector: 'app-collection-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-table.component.html',
  styleUrl: './collection-table.component.css',
})
export class CollectionTableComponent {
  private store = inject(Store);

  collections$: Observable<Collection[]> =
    this.store.select(selectCollectionsForCurrentUser);

  ngOnInit(): void {
    this.store.dispatch(getCollections());
  }

  getCollectionPoints(collection: Collection): number {
    return calculatePoints(collection);
  }

  getWasteTypesString(collection: Collection): string {
    return collection.wasteItems.map((item) => item.type).join(' & ');
  }

  getTotalWeight(collection: Collection): number {
    return collection.wasteItems.reduce((sum, item) => sum + item.weight, 0);
  }

  onDeleteCollection(id: number) {
    this.store.dispatch(deleteCollection({ id }));
  }

  onEditCollection(collection: Collection) {
    // We'll show how to open the dialog with "Edit" mode
    // or create a dedicated edit dialog, etc.
  }
}

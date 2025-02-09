import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Collection,
  CollectionStatus,
  WasteItem,
  WasteType,
} from '../../../core/models/Collection.model';
import { selectAcceptedCollectionsForCollector } from '../../../store/collection/collections.selectors';
import { updateCollection } from '../../../store/collection/collections.actions';

@Component({
  selector: 'app-collection-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-tracker.component.html',
})
export class CollectionTrackerComponent implements OnInit {
  private store = inject(Store);

  collections$!: Observable<Collection[]>;

  protected readonly WasteType = WasteType;
  protected readonly CollectionStatus = CollectionStatus;

  protected readonly statusSteps: CollectionStatus[] = [
    CollectionStatus.ACCEPTED,
    CollectionStatus.IN_PROGRESS,
    CollectionStatus.COMPLETED,
  ];

  // Waste type styling map
  readonly wasteTypeStyles: Record<WasteType, { bgClass: string; textClass: string }> = {
    [WasteType.PLASTIC]: { bgClass: 'bg-blue-100 dark:bg-blue-900', textClass: 'text-blue-700 dark:text-blue-300' },
    [WasteType.GLASS]: { bgClass: 'bg-amber-100 dark:bg-amber-900', textClass: 'text-amber-700 dark:text-amber-300' },
    [WasteType.PAPER]: { bgClass: 'bg-emerald-100 dark:bg-emerald-900', textClass: 'text-emerald-700 dark:text-emerald-300' },
    [WasteType.METAL]: { bgClass: 'bg-zinc-100 dark:bg-zinc-900', textClass: 'text-zinc-700 dark:text-zinc-300' },
  };

  ngOnInit() {
    this.collections$ = this.store.select(selectAcceptedCollectionsForCollector);
  }

  /** Get current step status for progress tracking */
  getStepStatus(collection: Collection, step: CollectionStatus): 'completed' | 'current' | 'pending' | 'rejected' {
    const statusOrder = [
      CollectionStatus.PENDING,
      CollectionStatus.ACCEPTED,
      CollectionStatus.IN_PROGRESS,
      CollectionStatus.COMPLETED,
    ];

    if (collection.status === CollectionStatus.REJECTED) return 'rejected';

    const currentIndex = statusOrder.indexOf(collection.status);
    const stepIndex = statusOrder.indexOf(step);

    return stepIndex < currentIndex ? 'completed' : stepIndex === currentIndex ? 'current' : 'pending';
  }

  /** Calculate total waste weight */
  getTotalWeight(wasteItems: WasteItem[]): number {
    return wasteItems.reduce((total, item) => total + item.weight, 0);
  }

  /** Format date */
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  /** Update collection status */
  protected updateStatus(collection: Collection, newStatus: CollectionStatus): void {
    if (collection.status === newStatus) return;

    this.store.dispatch(updateCollection({ collection: { ...collection, status: newStatus } }));
  }

  /** TrackBy function for collection list */
  trackByCollectionId(index: number, collection: Collection): number {
    return collection.id!;
  }
}

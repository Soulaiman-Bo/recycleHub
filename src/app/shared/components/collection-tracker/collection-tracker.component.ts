import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  Collection,
  CollectionStatus,
  WasteItem,
  WasteType,
} from '../../../core/models/Collection.model';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import {
  selectAcceptedCollectionsForCollector,
  selectAllCollections,
} from '../../../store/collection/collections.selectors';
import { selectUser } from '../../../store/auth/auth.selectors';
import { getCollections, updateCollection } from '../../../store/collection/collections.actions';

@Component({
  selector: 'app-collection-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-tracker.component.html',
  styleUrl: './collection-tracker.component.css',
})
export class CollectionTrackerComponent {
  private store = inject(Store);

  // @Input() collections: Collection[] = [];

  protected readonly WasteType = WasteType;
  protected readonly CollectionStatus = CollectionStatus;
  protected collections$!: Observable<Collection[]>;

  protected readonly statusSteps = [
    CollectionStatus.ACCEPTED,
    CollectionStatus.IN_PROGRESS,
    CollectionStatus.COMPLETED,
  ];

  readonly wasteTypeStyles: Record<
    WasteType,
    { bgClass: string; textClass: string }
  > = {
    [WasteType.PLASTIC]: {
      bgClass: 'bg-blue-100 dark:bg-blue-900',
      textClass: 'text-blue-700 dark:text-blue-300',
    },
    [WasteType.GLASS]: {
      bgClass: 'bg-amber-100 dark:bg-amber-900',
      textClass: 'text-amber-700 dark:text-amber-300',
    },
    [WasteType.PAPER]: {
      bgClass: 'bg-emerald-100 dark:bg-emerald-900',
      textClass: 'text-emerald-700 dark:text-emerald-300',
    },
    [WasteType.METAL]: {
      bgClass: 'bg-zinc-100 dark:bg-zinc-900',
      textClass: 'text-zinc-700 dark:text-zinc-300',
    },
  };

  ngOnInit() {
   // this.store.dispatch(getCollections());
    this.collections$ = this.store.select(
      selectAcceptedCollectionsForCollector
    );
  }


  // Old

  getStepStatus(
    collection: Collection,
    step: CollectionStatus
  ): 'completed' | 'current' | 'pending' | 'rejected' {
    const statusOrder = [
      CollectionStatus.PENDING,
      CollectionStatus.ACCEPTED,
      CollectionStatus.IN_PROGRESS,
      CollectionStatus.COMPLETED,
    ];

    if (collection.status === CollectionStatus.REJECTED) return 'rejected';

    const currentIndex = statusOrder.indexOf(collection.status);
    const stepIndex = statusOrder.indexOf(step);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  }

  getTotalWeight(wasteItems: WasteItem[]): number {
    return wasteItems.reduce((total, item) => total + item.weight, 0);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  protected updateStatus(collection: Collection, newStatus: CollectionStatus): void {
    if (collection.status === newStatus) return;
    
    const updatedCollection: Collection = {
      ...collection,
      status: newStatus
    };

    this.store.dispatch(updateCollection({ collection: updatedCollection }));
  }

}

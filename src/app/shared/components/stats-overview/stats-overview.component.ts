import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import {
  Collection,
  CollectionStatus,
} from '../../../core/models/Collection.model';
import { getCollections } from '../../../store/collection/collections.actions';
// Adjust the selector to your actual usage
import { selectCollectionsForCurrentUser } from '../../../store/collection/collections.selectors';
import { calculatePoints, convertPointsToMoney } from '../../utils/points.util';

@Component({
  selector: 'app-stats-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-overview.component.html',
  styleUrls: ['./stats-overview.component.css'],
})
export class StatsOverviewComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private subscription!: Subscription;

  // stats fields
  totalPoints = 0;
  totalWeight = 0;
  totalVoucherDh = 0;
  pendingCount = 0;
  inProgressCount = 0;
  activeRequests = 0;

  ngOnInit(): void {
    this.store.dispatch(getCollections());
    this.subscription = this.store
      .select(selectCollectionsForCurrentUser)
      .subscribe((collections: Collection[]) => {
        this.calculateStats(collections);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private calculateStats(collections: Collection[]): void {
    // Reset stats
    this.totalPoints = 0;
    this.totalWeight = 0;
    this.totalVoucherDh = 0;
    this.pendingCount = 0;
    this.inProgressCount = 0;

    // Tally everything
    for (const collection of collections) {
      // Count active requests
      if (collection.status === 'Pending') {
        this.pendingCount++;
      } else if (collection.status === 'In Progress') {
        this.inProgressCount++;
      }

      if (collection.status === CollectionStatus.COMPLETED) {
        // sum total weight for accepted collections
        for (const item of collection.wasteItems) {
          this.totalWeight += item.weight;
        }

        // use your points util
        const points = calculatePoints(collection);
        this.totalPoints += points;
      }
    }

    this.activeRequests = this.pendingCount + this.inProgressCount;
    this.totalVoucherDh = convertPointsToMoney(this.totalPoints);
    
  }
}

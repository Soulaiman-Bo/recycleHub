import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Collection } from '../../../core/models/Collection.model';
import { selectAllCollections } from '../../../store/collection/collections.selectors';
import { calculatePoints, convertPointsToMoney } from '../../utils/points.util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-points-withdrawal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './points-withdrawal.component.html',
  styleUrl: './points-withdrawal.component.css',
  styles: [
    `
      button:disabled {
        cursor: not-allowed;
      }
    `,
  ],
})
export class PointsWithdrawalComponent {
  private store = inject(Store);

  collections$!: Observable<Collection[]>;

  // Store total points as a reactive state
  private totalPointsSubject = new BehaviorSubject<number>(0);
  totalPoints$ = this.totalPointsSubject.asObservable();

  // Available withdrawal amounts
  readonly withdrawalOptions = [350, 120, 50];

  remainingPoints!: number;

  ngOnInit(): void {
    this.collections$ = this.store.select(selectAllCollections);

    // Calculate total points dynamically
    this.collections$.subscribe(collections => {
      const totalPoints = collections.reduce((sum, collection) => sum + calculatePoints(collection), 0);
      this.totalPointsSubject.next(totalPoints);
    });
  }

  /** Handles point withdrawal */
  withdrawPoints(amount: number): void {
    const currentPoints = this.totalPointsSubject.getValue();

    if (currentPoints >= amount) {
      const newPoints = currentPoints - amount;
      this.totalPointsSubject.next(newPoints);
      this.remainingPoints = newPoints;
    } else {
      alert("Not enough points to withdraw this amount!");
    }
  }

  /** TrackBy function for better performance */
  trackByAmount(index: number, amount: number): number {
    return amount;
  }
}

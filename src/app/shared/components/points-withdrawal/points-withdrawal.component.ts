import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  firstValueFrom,
  map,
} from 'rxjs';
import { Collection } from '../../../core/models/Collection.model';
import { selectAllCollections } from '../../../store/collection/collections.selectors';
import { calculatePoints } from '../../utils/points.util';
import { convertPointsToMoney } from '../../utils/points.util';  // for your custom logic
import { Withdrawal, WithdrawalService } from '../../../core/services/withdrawal.service';

@Component({
  selector: 'app-points-withdrawal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './points-withdrawal.component.html',
})
export class PointsWithdrawalComponent implements OnInit {
  private store = inject(Store);
  private withdrawalService = inject(WithdrawalService);

  collections$!: Observable<Collection[]>;

  // Track total points (from collections)
  private totalPointsSubject = new BehaviorSubject<number>(0);
  totalPoints$ = this.totalPointsSubject.asObservable();

  // Track total withdrawn (in points)
  private withdrawnPointsSubject = new BehaviorSubject<number>(0);
  withdrawnPoints$ = this.withdrawnPointsSubject.asObservable();

  // Available points = totalPoints - withdrawnPoints
  availablePoints$ = combineLatest([this.totalPoints$, this.withdrawnPoints$]).pipe(
    map(([totalPoints, withdrawn]) => totalPoints - withdrawn)
  );

  // Store all withdrawals in memory
  withdrawals: Withdrawal[] = [];

  // Remaining points after the most recent withdrawal
  remainingPoints!: number;

  // Example withdrawal options in *points*
  // (using your logic: 500→350Dh, 200→120Dh, 100→50Dh)
  readonly withdrawalOptions = [500, 200, 100];

  ngOnInit(): void {
    // 1) Get total points from the store (collections)
    this.collections$ = this.store.select(selectAllCollections);
    this.collections$.subscribe((collections) => {
      const totalPoints = collections.reduce(
        (sum, collection) => sum + calculatePoints(collection),
        0
      );
      this.totalPointsSubject.next(totalPoints);
    });

    // 2) Load existing withdrawals from backend
    this.withdrawalService.getUserWithdrawals().subscribe((withdrawals) => {
      this.withdrawals = withdrawals;
      // Sum of points used so far
      const totalWithdrawnPoints = withdrawals.reduce((sum, w) => sum + w.points, 0);
      this.withdrawnPointsSubject.next(totalWithdrawnPoints);
    });
  }

  /** Withdraw the specified points, convert to money, and persist. */
  async withdrawPoints(pointsToWithdraw: number): Promise<void> {
    const availablePoints = await firstValueFrom(this.availablePoints$);

    if (availablePoints < pointsToWithdraw) {
      alert('Not enough points to withdraw this amount!');
      return;
    }

    // Convert points → money using your custom function
    const moneyGained = convertPointsToMoney(pointsToWithdraw);

    // Save the withdrawal to the server
    this.withdrawalService.saveWithdrawal(pointsToWithdraw, moneyGained).subscribe({
      next: (savedWithdrawal) => {
        this.withdrawals.push(savedWithdrawal);

        // Update total withdrawn points
        const currentlyWithdrawn = this.withdrawnPointsSubject.getValue();
        this.withdrawnPointsSubject.next(currentlyWithdrawn + pointsToWithdraw);

        // Show the user how many remain
        this.remainingPoints = availablePoints - pointsToWithdraw;
      },
      error: (err) => {
        alert('Error while saving withdrawal: ' + err.message);
      },
    });
  }

  /** TrackBy for better performance in *ngFor. */
  trackByAmount(index: number, amount: number): number {
    return amount;
  }
}

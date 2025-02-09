import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PickupRequestDialogComponent } from '../../../shared/components/pickup-request-dialog/pickup-request-dialog.component';
import { CommonModule } from '@angular/common';
import { CollectionTableComponent } from '../../../shared/components/collection-table/collection-table.component';
import { StatsOverviewComponent } from '../../../shared/components/stats-overview/stats-overview.component';
import { PointsWithdrawalComponent } from '../../../shared/components/points-withdrawal/points-withdrawal.component';
import { Store } from '@ngrx/store';
import { User } from '../../../core/models/user.model';
import { selectUser } from '../../../store/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-individual',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    CollectionTableComponent,
    StatsOverviewComponent,
    PointsWithdrawalComponent
  ],
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.css',
})
export class IndividualComponent {
  private dialog = inject(MatDialog);
    store = inject(Store);
    user$: Observable<User | null> = this.store.select(selectUser);

  openPickupDialog() {
    const dialogRef = this.dialog.open(PickupRequestDialogComponent, {
      width: '50vw',
      maxWidth: '80vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Pickup Request Submitted:', result);
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PickupRequestDialogComponent } from '../../../shared/components/pickup-request-dialog/pickup-request-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-individual',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.css'
})
export class IndividualComponent {
  private dialog = inject(MatDialog);

  openPickupDialog() {
    const dialogRef = this.dialog.open(PickupRequestDialogComponent, {
      width: '50vw',
      maxWidth: '80vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Pickup Request Submitted:', result);
      }
    });
  }
}

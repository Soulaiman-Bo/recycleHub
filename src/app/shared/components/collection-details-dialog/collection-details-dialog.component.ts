import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Collection } from '../../../core/models/Collection.model';

const BROKEN_IMAGE_URL = 'assets/broken.png';


@Component({
  selector: 'app-collection-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './collection-details-dialog.component.html',
  styleUrl: './collection-details-dialog.component.css'
})
export class CollectionDetailsDialogComponent {
  BROKEN_IMAGE_URL = BROKEN_IMAGE_URL;
  dialogRef = inject(MatDialogRef<CollectionDetailsDialogComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { collection: Collection }) {}


  getCollectorName(): string {
    return 'John Doe';
  }

  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = BROKEN_IMAGE_URL; // fallback
  }

}

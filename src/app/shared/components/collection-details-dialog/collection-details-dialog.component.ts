import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  Collection,
  CollectionStatus,
} from '../../../core/models/Collection.model';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCalendar,
  heroClock,
  heroMapPin,
  heroXMark,
  heroPhoto,
  heroDocument,
  heroTrash,
} from '@ng-icons/heroicons/outline';

const BROKEN_IMAGE_URL = 'assets/broken.png';

@Component({
  selector: 'app-collection-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, NgIcon],
  viewProviders: [
    provideIcons({
      heroCalendar,
      heroClock,
      heroMapPin,
      heroXMark,
      heroPhoto,
      heroDocument,
      heroTrash,
    }),
  ],
  templateUrl: './collection-details-dialog.component.html',
  styleUrl: './collection-details-dialog.component.css',
})
export class CollectionDetailsDialogComponent {
  BROKEN_IMAGE_URL = BROKEN_IMAGE_URL;
  dialogRef = inject(MatDialogRef<CollectionDetailsDialogComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { collection: Collection }
  ) {}

  getCollectorName(): string {
    return 'John Doe';
  }

  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = BROKEN_IMAGE_URL; // fallback
  }

  getStatusClass(): string {
    const baseClasses =
      'inline-block px-3 py-1 rounded-full text-sm font-medium mt-2';
    switch (this.data.collection.status) {
      case CollectionStatus.PENDING:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case CollectionStatus.IN_PROGRESS:
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case CollectionStatus.COMPLETED:
        return `${baseClasses} bg-green-100 text-green-800`;
      case CollectionStatus.REJECTED:
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return baseClasses;
    }
  }
}

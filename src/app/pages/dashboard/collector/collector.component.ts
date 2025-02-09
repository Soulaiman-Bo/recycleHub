import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { CollectorCollectionTableComponent } from '../../../shared/components/collector-collection-table/collector-collection-table.component';
import { CollectionTrackerComponent } from '../../../shared/components/collection-tracker/collection-tracker.component';
import { Collection, CollectionStatus, WasteType } from '../../../core/models/Collection.model';

@Component({
  selector: 'app-collector',
  standalone: true,
  imports: [CommonModule, CollectorCollectionTableComponent, CollectionTrackerComponent],
  templateUrl: './collector.component.html',
  styleUrl: './collector.component.css'
})
export class CollectorComponent {
  collections: Collection[] = [
    {
      id: 1,
      userId: 'user123',
      collectorId: 'collector456',
      wasteItems: [
        { type: WasteType.PLASTIC, weight: 10 },
        { type: WasteType.GLASS, weight: 15 }
      ],
      photos: ['photo1.jpg', 'photo2.jpg'],
      address: '123 Green Street',
      city: 'Eco City',
      date: '2024-02-09',
      timeSlot: '09:00-11:00',
      notes: 'Please handle with care',
      status: CollectionStatus.IN_PROGRESS
    }
  ];
}

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

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { CollectorCollectionTableComponent } from '../../../shared/components/collector-collection-table/collector-collection-table.component';

@Component({
  selector: 'app-collector',
  standalone: true,
  imports: [CommonModule, CollectorCollectionTableComponent],
  templateUrl: './collector.component.html',
  styleUrl: './collector.component.css'
})
export class CollectorComponent {

}

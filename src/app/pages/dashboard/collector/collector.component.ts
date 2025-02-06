import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-collector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collector.component.html',
  styleUrl: './collector.component.css'
})
export class CollectorComponent {

}

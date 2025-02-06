import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CollectorComponent } from './collector/collector.component';
import { IndividualComponent } from './individual/individual.component';
import { HomeComponent } from '../home/home.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'collector',
        component: CollectorComponent,
      },
      {
        path: 'individual',
        component: IndividualComponent,
      },
    ],
  },
];

import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CollectorComponent } from './collector/collector.component';
import { IndividualComponent } from './individual/individual.component';
import { HomeComponent } from '../home/home.component';
import { RoleGuard } from '../../core/guards/role.guard';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'collector',
        component: CollectorComponent,
        canActivate: [RoleGuard],
        data: { roles: ['Collector'] },
      },
      {
        path: 'individual',
        component: IndividualComponent,
        canActivate: [RoleGuard],
        data: { roles: ['individual'] },
      },
    ],
  },
];

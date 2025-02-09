import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { ProfileService } from './core/services/profile.service';
import { UserProfilePageComponent } from './pages/profile/profile.component';
import { UnauthorizedComponent } from './pages/error/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: UserProfilePageComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.AuthenticaionRoutest),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routes').then((m) => m.DashboardRoutes),
    canActivate: [authGuard],
  },
];

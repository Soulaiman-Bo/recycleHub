import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
// Option 1: Using NgRx Store with a selector (adjust the path as needed)
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/auth/auth.selectors';

// Option 2: Alternatively, if you have an AuthService, you can import and use it
// import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  // Using the store in this example. Alternatively, inject AuthService.
    private store = inject(Store);

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // Retrieve the allowed roles from the route data.
    const allowedRoles: string[] = route.data['roles'];

    return this.store.select(selectUser).pipe(
      take(1),
      map((user) => {
        // If the user exists and the role is allowed, grant access.
        if (user && allowedRoles.includes(user.role)) {
          return true;
        }
        // Otherwise, redirect to an unauthorized page (or login).
        return this.router.createUrlTree(['/unauthorized']);
      })
    );
  }
}

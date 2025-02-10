import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class RoleRedirectGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.store.select(selectUser).pipe(
      take(1),
      map((user) => {
        if (!user) {
          return this.router.createUrlTree(['/auth/login']);
        }
        if (user.role === 'Collector') {
          return this.router.createUrlTree(['/dashboard/collector']);
        }
        if (user.role === 'individual') {
          return this.router.createUrlTree(['/dashboard/individual']);
        }
        return this.router.createUrlTree(['/dashboard']);
      })
    );
  }
}

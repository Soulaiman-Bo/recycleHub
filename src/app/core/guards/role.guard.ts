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
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/auth/auth.selectors';


@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    private store = inject(Store);

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const allowedRoles: string[] = route.data['roles'];

    return this.store.select(selectUser).pipe(
      take(1),
      map((user) => {
        if (user && allowedRoles.includes(user.role)) {
          return true;
        }
        return this.router.createUrlTree(['/unauthorized']);
      })
    );
  }
}

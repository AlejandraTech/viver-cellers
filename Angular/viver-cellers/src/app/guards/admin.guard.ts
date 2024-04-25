import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is authenticated and is an administrator
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;
    } else {
      // If you do not meet the requirements, redirects to the main page
      this.router.navigate(['/']);
      return false;
    }
  }
}

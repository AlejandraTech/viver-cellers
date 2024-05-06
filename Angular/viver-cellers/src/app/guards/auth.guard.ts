import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is authenticated and has one of the allowed roles
    if (this.authService.isLoggedIn() && (this.authService.isAdmin() || this.authService.isClient() || this.authService.isNurseryman())) {
      return true;
    } else {
      // If not authenticated or does not have the required role, redirect to the home page
      this.router.navigate(['/']);
      return false;
    }
  }
}

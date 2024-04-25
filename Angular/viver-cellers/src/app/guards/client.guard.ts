import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClientGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is authenticated and is a client
    if (this.authService.isLoggedIn() && this.authService.isClient()) {
      return true;
    } else {
      // If not authenticated or not a client, redirect to the home page
      this.router.navigate(['/']);
      return false;
    }
  }
}

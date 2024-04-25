import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NurserymanGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is authenticated and is a nurseryman
    if (this.authService.isLoggedIn() && this.authService.isNurseryman()) {
      return true;
    } else {
      // If the user is not authenticated or not a nurseryman, redirect to the home page
      this.router.navigate(['/']);
      return false;
    }
  }
}

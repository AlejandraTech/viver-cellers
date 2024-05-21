import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  /**
   * Variables used in different methods
   */
  isAdmin = false;
  isClient = false;
  isNurseryman = false;
  isAuthenticated = false;
  user: any = {};
  isMenuOpen = false;
  isAdminMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Call to the Auth service to verify if the user is logged in.
   */
  ngOnInit(): void {
    initFlowbite();

    this.authService.isAuthenticated().subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        // if authenticated, information is obtained from the user
        if (authenticated) {
          this.authService.getUser().subscribe(
            (user) => {
              this.user = user;
              this.isAdmin = user.rol === 'admin';
              this.isClient = user.rol === 'client';
              this.isNurseryman = user.rol === 'nurseryman';
            },
            (error) => {
              console.error("Error en obtenir l'usuari:", error);
            }
          );
        }
      },
      (error) => {
        console.error("Error en verificar l'autenticació:", error);
      }
    );
  }

  /**
   * Calls the authService's logout function to log the user out.
   */
  logout(): void {
    this.authService.logout().subscribe(() => {
      window.location.href = '/login';
    });
  }

  /**
   *Check if the logged in user is not an admin.
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen && this.isAdminMenuOpen) {
      this.isAdminMenuOpen = false;
    }
  }

  /**
   *
   */
  toggleAdminMenu(): void {
    this.isAdminMenuOpen = !this.isAdminMenuOpen;
    if (this.isAdminMenuOpen && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any): void {
    if (!event.target.closest('#client-menu-button')) {
      this.isMenuOpen = false;
    }
    if (!event.target.closest('#admin-menu-button')) {
      this.isAdminMenuOpen = false;
    }
  }
}

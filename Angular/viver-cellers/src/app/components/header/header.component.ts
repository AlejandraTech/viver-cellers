import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { filter } from 'rxjs/operators';
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
  backgroundImage: string = '/assets/img/header-background/home-background.jpg'; // Ruta predeterminada de la imagen de fondo
  isAdmin = false;
  isClient = false;
  isNurseryman = false;
  isAuthenticated = false;
  user: any = {};

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

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updatePageInfo((event as NavigationEnd).url);
      });
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
   * Method to update background image based on current route
   * @param - url
   */
  updatePageInfo(url: string): void {
    switch (url) {
      case '/home':
        this.backgroundImage =
          '/assets/img/header-background/home-background.jpg';
        break;
      case '/about':
        this.backgroundImage =
          '/assets/img/header-background/about-background.jpg';
        break;
      case '/contact':
        this.backgroundImage =
          '/assets/img/header-background/contact-background.jpg';
        break;
      case '/requirements':
        this.backgroundImage =
          '/assets/img/header-background/home-background.jpg';
        break;
      case '/services':
        this.backgroundImage =
          '/assets/img/header-background/home-background.jpg';
        break;
      case '/information':
        this.backgroundImage =
          '/assets/img/header-background/home-background.jpg';
        break;
      case '/regulation':
        this.backgroundImage =
          '/assets/img/header-background/home-background.jpg';
        break;
      case '/pect':
        this.backgroundImage =
          '/assets/img/header-background/home-background.jpg';
        break;
      default:
        this.backgroundImage =
          '/assets/img/header-background/home-background.jpg';
    }
  }
}

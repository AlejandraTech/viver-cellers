import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  backgroundImage: string = "/assets/img/header-background/home-background.jpg"; // Ruta predeterminada de la imagen de fondo

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    initFlowbite();

    // Subscribe to router navigation events to update title and background image
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        // Logic to change background image based on current route
        this.updatePageInfo((event as NavigationEnd).url);
      });
  }

  // Method to update background image based on current route
  updatePageInfo(url: string): void {
    switch (url) {
      case '/home':
        this.backgroundImage = '/assets/img/header-background/home-background.jpg';
        break;
      case '/about':
        this.backgroundImage = '/assets/img/header-background/about-background.jpg';
        break;
      case '/contact':
        this.backgroundImage = '/assets/img/header-background/contact-background.jpg';
        break;
      case '/requirements':
        this.backgroundImage = '/assets/img/header-background/home-background.jpg';
        break;
      case '/services':
        this.backgroundImage = '/assets/img/header-background/home-background.jpg';
        break;
      case '/information':
        this.backgroundImage = '/assets/img/header-background/home-background.jpg';
        break;
      case '/regulation':
        this.backgroundImage = '/assets/img/header-background/home-background.jpg';
        break;
      case '/pect':
        this.backgroundImage = '/assets/img/header-background/home-background.jpg';
        break;
      default:
        this.backgroundImage = '/assets/img/header-background/home-background.jpg';
    }
  }
}

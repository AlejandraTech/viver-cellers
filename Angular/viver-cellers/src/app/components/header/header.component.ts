import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  backgroundImage: string = "/assets/img/header-background/home-background.jpeg"; // Ruta predeterminada de la imagen de fondo

  constructor(private router: Router) { }

  ngOnInit(): void {
    initFlowbite();

    // Suscribirse a los eventos de navegación del router para actualizar el título y la imagen de fondo
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        // Lógica para cambiar imagen de fondo según la ruta actual
        this.updatePageInfo((event as NavigationEnd).url);
      });
  }

  // Método para actualizar la imagen de fondo según la ruta actual
  updatePageInfo(url: string): void {
    switch (url) {
      case '/home':
        this.backgroundImage = '/assets/img/header-background/home-background.jpeg';
        break;
      case '/about':
        this.backgroundImage = '/assets/img/header-background/about-background.jpg';
        break;
      case '/contact':
        this.backgroundImage = '/assets/img/header-background/contact-background.jpg';
        break;
      case '/requirements':
        this.backgroundImage = '/assets/img/header-background/home-background.jpeg';
        break;
      case '/services':
        this.backgroundImage = '/assets/img/header-background/home-background.jpeg';
        break;
      case '/information':
        this.backgroundImage = '/assets/img/header-background/home-background.jpeg';
        break;
      case '/regulation':
        this.backgroundImage = '/assets/img/header-background/home-background.jpeg';
        break;
      case '/pect':
        this.backgroundImage = '/assets/img/header-background/home-background.jpeg';
        break;
      default:
        this.backgroundImage = '/assets/img/header-background/home-background.jpeg';
    }
  }
}

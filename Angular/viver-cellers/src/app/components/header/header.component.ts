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
  backgroundImage: string = "/assets/img/header-background/default-background.jpg"; // Ruta predeterminada de la imagen de fondo

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
        this.backgroundImage = '/assets/img/header-background/home-background.jpg';
        break;
      case '/about':
        this.backgroundImage = '/assets/img/header-background/about-background.jpg';
        break;
      case '/contact':
        this.backgroundImage = '/assets/img/header-background/contact-background.jpg';
        break;
      default:
        this.backgroundImage = '/assets/img/header-background/default-background.jpeg';
    }
  }
}

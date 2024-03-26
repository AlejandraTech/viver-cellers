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
  pageTitle: string = "Título Predeterminado";

  constructor(private router: Router) { }

  ngOnInit(): void {
    initFlowbite();

    // Suscribirse a los eventos de navegación del router para actualizar el título
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        // Aquí puedes definir la lógica para cambiar el título según la ruta actual
        this.updatePageTitle((event as NavigationEnd).url);
      });
  }

  // Método para actualizar el título según la ruta actual
  updatePageTitle(url: string): void {
    switch (url) {
      case '/home':
        this.pageTitle = 'Página de Inicio';
        break;
      case '/about':
        this.pageTitle = 'Acerca de Nosotros';
        break;
      case '/contact':
        this.pageTitle = 'Contáctanos';
        break;
      default:
        this.pageTitle = 'Título Predeterminado';
    }
  }
}

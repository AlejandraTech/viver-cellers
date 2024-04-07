import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Página Inicio
  { path: 'requirements', component: RequirementsComponent }, // Página de los requerimientos
  { path: 'services', component: ServicesComponent }, // Página de los servicios

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Página que se carga primero
  // { path: '**', component: ErrorPageComponent }, // URL incorrecta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

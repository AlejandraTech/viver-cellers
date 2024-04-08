import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { ServicesComponent } from './components/services/services.component';
import { InformationComponent } from './components/information/information.component';
import { RegulationComponent } from './components/regulation/regulation.component';
import { PectComponent } from './components/pect/pect.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Página Inicio
  { path: 'requirements', component: RequirementsComponent }, // Página de los Requisitos
  { path: 'services', component: ServicesComponent }, // Página de los Servicios
  { path: 'information', component: InformationComponent }, // Página de Informcaión del Vivero
  { path: 'regulation', component: RegulationComponent }, // Página del Reglamento
  { path: 'pect', component: PectComponent }, // Página de Informcaión del PECT

  { path: 'register', component: RegisterComponent }, // Página de Registro
  { path: 'login', component: LoginComponent }, // Página de Login

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Página que se carga primero
  // { path: '**', component: ErrorPageComponent }, // URL incorrecta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

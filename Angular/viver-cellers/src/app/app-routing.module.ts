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
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AdminGuard } from './guards/admin.guard';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ShopComponent } from './components/shop/shop.component';
import { ClientGuard } from './guards/client.guard';
import { CartComponent } from './components/cart/cart.component';
import { InfoProjectComponent } from './components/info-project/info-project.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Home Page
  { path: 'requirements', component: RequirementsComponent }, // Requirements Page
  { path: 'services', component: ServicesComponent }, // Services Page
  { path: 'information', component: InformationComponent }, // Nursery Information Page
  { path: 'regulation', component: RegulationComponent }, // Regulation Page
  { path: 'pect', component: PectComponent }, // PECT Information Page

  { path: 'info-project/:id', component: InfoProjectComponent }, // Information Projects Page

  { path: 'register', component: RegisterComponent }, // Registration Page
  { path: 'login', component: LoginComponent }, // Login Page

  { path: 'shop', component: ShopComponent, canActivate: [ClientGuard]}, // Shop Page
  { path: 'cart', component: CartComponent, canActivate: [ClientGuard]}, // Cart Page

  { path: 'user_management', component: UserManagementComponent, canActivate: [AdminGuard]}, // User Management Page
  { path: 'project_management', component: ProjectManagementComponent, canActivate: [AdminGuard]}, // Project Management Page

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Page that loads first
  { path: '**', component: ErrorPageComponent }, // Incorrect URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

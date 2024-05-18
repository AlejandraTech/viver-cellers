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
import { InfoProductComponent } from './components/info-product/info-product.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { GuestGuard } from './guards/guest.guard';
import { ProjectsComponent } from './components/projects/projects.component';
import { NurserymanGuard } from './guards/nurseryman.guard';
import { InformationNurserymanComponent } from './components/information-nurseryman/information-nurseryman.component';
import { OrderNurserymanComponent } from './components/order-nurseryman/order-nurseryman.component';
import { SalesGraphComponent } from './components/sales-graph/sales-graph.component';

/**
 * Array with all the paths to the project components.
 */
const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Home Page
  { path: 'requirements', component: RequirementsComponent }, // Requirements Page
  { path: 'services', component: ServicesComponent }, // Services Page
  { path: 'information', component: InformationComponent }, // Nursery Information Page
  { path: 'regulation', component: RegulationComponent }, // Regulation Page
  { path: 'pect', component: PectComponent }, // PECT Information Page
  { path: 'project', component: ProjectsComponent }, // Projects Information Page

  { path: 'info-project/:id', component: InfoProjectComponent }, // Information Projects Page
  { path: 'info-product/:id', component: InfoProductComponent }, // Information Product Page

  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] }, // Registration Page
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] }, // Login Page

  { path: 'edit_profile', component: EditProfileComponent, canActivate: [AuthGuard] }, // Edit Profile Page

  { path: 'shop', component: ShopComponent, canActivate: [ClientGuard] }, // Shop Page
  { path: 'cart', component: CartComponent, canActivate: [ClientGuard] }, // Cart Page
  { path: 'payment', component: PaymentComponent, canActivate: [ClientGuard] }, // Payment Page
  { path: 'user_order', component: UserOrdersComponent, canActivate: [ClientGuard] }, // Orders Page

  { path: 'information_nurseryman', component: InformationNurserymanComponent, canActivate: [NurserymanGuard] }, // Information Nurseryman Page
  { path: 'order_nurseryman', component: OrderNurserymanComponent, canActivate: [NurserymanGuard] }, // Order Nurseryman Page
  { path: 'graphic_order_nurseryman', component: SalesGraphComponent, canActivate: [NurserymanGuard] }, // Sales Graph Nurseryman Page

  { path: 'user_management', component: UserManagementComponent, canActivate: [AdminGuard] }, // User Management Page
  { path: 'project_management', component: ProjectManagementComponent, canActivate: [AdminGuard] }, // Project Management Page
  { path: 'product_management', component: ProductManagementComponent, canActivate: [AdminGuard] }, // Product Management Page

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Page that loads first
  { path: '**', component: ErrorPageComponent }, // Incorrect URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

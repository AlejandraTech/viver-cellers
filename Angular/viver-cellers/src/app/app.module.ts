import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { ServicesComponent } from './components/services/services.component';
import { InformationComponent } from './components/information/information.component';
import { RegulationComponent } from './components/regulation/regulation.component';
import { PectComponent } from './components/pect/pect.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DniDirective } from './directives/dni.directive';
import { RepeatPasswordDirective } from './directives/repeat-password.directive';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { InfoProjectComponent } from './components/info-project/info-project.component';
import { InfoProductComponent } from './components/info-product/info-product.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RequirementsComponent,
    ServicesComponent,
    InformationComponent,
    RegulationComponent,
    PectComponent,
    RegisterComponent,
    LoginComponent,
    DniDirective,
    RepeatPasswordDirective,
    UserManagementComponent,
    ProjectManagementComponent,
    ErrorPageComponent,
    ShopComponent,
    CartComponent,
    InfoProjectComponent,
    InfoProductComponent,
    ProductManagementComponent,
    EditProfileComponent,
    PaymentComponent,
    UserOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

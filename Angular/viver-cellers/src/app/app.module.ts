import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { ReactiveFormsModule } from '@angular/forms';
import { DniDirective } from './directives/dni.directive';
import { RepeatPasswordDirective } from './directives/repeat-password.directive';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { InfoProjectComponent } from './components/info-project/info-project.component';

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
    InfoProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

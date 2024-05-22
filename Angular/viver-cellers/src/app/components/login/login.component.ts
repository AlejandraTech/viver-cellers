import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  email!: string;
  password!: string;
  errorMessage: string = '';

  //The constructor do validations and services are injected
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)])
    });
  }

  // Submit the login form.
  onSubmit() {
    // Check if the user is not logged in
    if (this.authService.isLoggedIn()) {
      this.errorMessage = 'Necessites estar registrat per iniciar sessió.';
      return; // Stop further execution
    }

    // if the form is valid
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // Try to log in using the authentication service
      this.authService.login(email, password).subscribe(
        // Almacena el token de acceso y la información del usuario en el almacenamiento local
        response => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user_id', response.user.id);
          localStorage.setItem('user_name', response.user.name);
          localStorage.setItem('user_rol', response.user.rol);
          // Recarga la página después de iniciar sesión exitosamente
          location.reload();
        },
        error => {
          // Si hay un error en la solicitud de inicio de sesión
          if (error.status === 401) {
            this.errorMessage = 'Correu electrònic o contrasenya incorrectes';
          } else {
            this.errorMessage = 'Es va produir un error en iniciar sessió. Si us plau, intenta-ho de nou més tard.';
          }
        }
      );
    } else {
      console.log('Formulari invàlid');
    }
  }
}

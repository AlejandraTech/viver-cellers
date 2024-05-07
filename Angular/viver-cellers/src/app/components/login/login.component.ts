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
  /**
   *
   */
  loginForm: FormGroup;
  email!: string;
  password!: string;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  // Submit the login form.
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user_id', response.user.id);
          localStorage.setItem('user_name', response.user.name);
          localStorage.setItem('user_rol', response.user.rol);
          location.reload();
          this.router.navigate(['/home']);
        },
        error => {
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

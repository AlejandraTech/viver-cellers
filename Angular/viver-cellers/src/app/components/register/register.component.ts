import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register!: FormGroup;
  id_province_fk: any[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.register = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatpassword: new FormControl('', [Validators.required]),
      id_province_fk: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.authService.getProvinces().subscribe(
      (response) => {
        this.id_province_fk = response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.register.valid) {
      const userData = {
        name: this.register.value.name,
        lastname: this.register.value.lastname,
        dni: this.register.value.dni,
        email: this.register.value.email,
        password: this.register.value.password,
        id_province_fk: this.register.value.id_province_fk
      };
      this.authService.registerUser(userData)
        .subscribe(
          response => {
            this.router.navigate(['/home']);
          },
          error => {
            if (error.status === 422) {
              this.errorMessage = 'El usuario ya está registrado. Por favor, intenta con otro correo electrónico.';
            } else {
              this.errorMessage = 'Ocurrió un error. Por favor, inténtalo de nuevo más tarde.';
            }
          }
        );
    }
  }
}

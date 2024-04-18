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
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("[a-z]+")]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$")]),
      dni: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")]),
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
              this.errorMessage = `L'usuari ja està registrat. Si us plau, intenta-ho amb una altra adreça de correu electrònic.`;
            } else {
              this.errorMessage = `S'ha produït un error. Si us plau, torna-ho a provar més tard.`;
            }
          }
        );
    }
  }
}

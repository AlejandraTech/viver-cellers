import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required] // Asegúrate de manejar la contraseña adecuadamente
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    if (!this.profileForm) {
      console.error('El formulario no está inicializado');
      return;
    }

    this.authService.getUser().subscribe(user => {
      this.profileForm.patchValue({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: '' // No asignamos la contraseña aquí por razones de seguridad
      });
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value).subscribe(
        response => {
          console.log('Perfil actualizado con éxito');
        },
        error => {
          console.error('Error al actualizar el perfil:', error);
        }
      );
    }
  }
}

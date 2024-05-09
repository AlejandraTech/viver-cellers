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
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    if (!this.profileForm) {
      console.error('El formulari no está inicialitzat');
      return;
    }

    this.authService.getUser().subscribe(user => {
      this.profileForm.patchValue({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: ''
      });
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value).subscribe(
        response => {
          console.log('Perfil actualitzat amb exit');
        },
        error => {
          console.error('Error al actualitzar el perfil:', error);
        }
      );
    }
  }
}

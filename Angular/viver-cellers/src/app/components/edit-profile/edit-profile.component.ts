import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // Variable to store the success message
  successMessage: string = '';
  // Error message to display to the user in case of issues
  errorMessage: string = '';

  profileForm!: FormGroup;

  constructor(private authService: AuthService) {
    //Edit profile form with fields and validations
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙçÇ'° ]+$")]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙçÇ'° ]+$")]),
      email: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)])
    });
  }

  /**
   * Method executed when the component initializes
   */
  ngOnInit() {
    this.loadUserProfile();
  }

  /**
   * Method to fetch the information of user from the service and update the form with this data
   */
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

  /**
   * Method to submit the user modification form
   */
  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value).subscribe(
        response => {
          console.log('Perfil actualitzat amb exit');
          this.successMessage = 'Perfil actualitzat amb exit';
          this.errorMessage = '';
        },
        error => {
          console.error('Error al actualitzar el perfil:', error);
          this.errorMessage = "Error al actualitzar el perfil. Si us plau, torna-ho a intentar més tard";
          this.successMessage = '';
        }
      );
    }
  }

  closeSuccessMessage(): void {
    this.successMessage = '';
  }
}

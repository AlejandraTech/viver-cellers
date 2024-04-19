// This component handles user management, including adding, modifying, and deleting users.

// Necessary imports from Angular and related services
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  // Array to store users fetched from the database
  users: any[] = [];
  // Array to store available roles
  roles: string[] = [];
  // Selected user identifier for modification
  userId: any;
  // Array to store provinces obtained from the service
  id_province_fk: any[] = [];
  // Variable to store the success message
  successMessage: string = '';
  // Error message to display to the user in case of issues
  errorMessage: string = '';
  // Array to store user data for modification
  modifyusers: any = [];

  // Define form control
  adduser!: FormGroup; // Define form control property of type formGroup to add users
  modifyuser!: FormGroup; // Define form control property of type formGroup to modify users


  constructor(private service: AuthService) { }

  // Method executed when the component initializes
  ngOnInit(): void {
    // Get the list of users and available roles
    this.getUsers();
    this.getRoles();

    // Initialize the form for adding users
    this.adduser = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$")]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$")]),
      dni: new FormControl('', [Validators.minLength(9), Validators.maxLength(9)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      id_province_fk: new FormControl('', [Validators.required])
    });

    // Initialize the form for modifying users
    this.modifyuser = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rol: new FormControl('', [Validators.required])
    });

    // Get the list of available provinces
    this.service.getProvinces().subscribe(
      (response) => {
        this.id_province_fk = response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Method to fetch the list of roles from the service
  getRoles(): void {
    this.service.getRoles().subscribe(
      (response) => {
        this.roles = response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Method to fetch the list of users from the service
  getUsers(): void {
    this.service.getUsers().subscribe(
      data => {
        this.users = data.data;
      },
      error => {
        console.error(`Error en la recuperació d'usuaris:`, error);
      }
    );
  }

  /**
   * Method to add a new user from the form, only allowed for the administrator
   */
  submitAdd(): void {
    if (this.adduser.valid) {
      const userData = {
        name: this.adduser.value.name,
        lastname: this.adduser.value.lastname,
        dni: this.adduser.value.dni,
        email: this.adduser.value.email,
        password: this.adduser.value.password,
        id_province_fk: this.adduser.value.id_province_fk
      };
      this.service.registerUser(userData)
        .subscribe(
          response => {
            this.getUsers(); // Update the list of users after addition
            this.successMessage = 'Usuari afegit amb èxit.';
            this.errorMessage = '';
          },
          error => {
            if (error.status == 422) {
              this.successMessage = '';
              this.errorMessage = `S'ha produït un error. Si us plau, torna-ho a provar més tard.`;
            } else {
              this.successMessage = '';
              this.errorMessage = `L'usuari ja està registrat. Si us plau, intenta-ho amb una altra adreça de correu electrònic.`;
            }
          }
        );
    }
  }

  // Method to submit the user modification form
  onSubmit(): void {
    if (this.modifyuser.valid) {
      const userData = {
        password: this.modifyuser.value.password,
        rol: this.modifyuser.value.rol
      };
      // Call the service to update user data
      this.service.updateUser(userData, this.userId)
        .subscribe(
          response => {
            this.getUsers(); // Update the list of users after modification
            this.isModifyFormVisible = false; // Hide the modification form after sending the request
            this.isAddFormVisible = true; // Show add form
            this.successMessage = 'Usuari modificat amb èxit.';
            this.errorMessage = '';
          },
          error => {
            this.errorMessage = `S'ha produït un error mentre es modificava l'usuari. Si us plau, intenta-ho de nou més tard.`;
            this.successMessage = '';
          }
        );
    }
  }

  // Method to delete a user
  deleteUser(userId: number): void {
    this.service.deleteUser(userId).subscribe(
      response => {
        this.getUsers();
        this.successMessage = `L'usuari s'ha eliminat amb èxit.`;
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = `S'ha produït un error mentre es modificava l'usuari. Si us plau, torni a intentar-ho més tard.`;
        this.successMessage = '';
      }
    );
  }

  // Properties to control the visibility of forms and modification buttons
  isModifyFormVisible: boolean = false;
  isAddFormVisible: boolean = true;
  modifyButtonsDisabled: boolean[] = [];

  // Method to toggle the visibility of the modification form
  toggleModifyFormVisibility(userId: any) {
    console.log(`Identificador d'usuari seleccionat:`, userId);
    this.userId = userId;
    this.isModifyFormVisible = true;
    this.isAddFormVisible = false;
  }

  // Method to cancel user modification and return to the addition form
  cancelar() {
    this.isModifyFormVisible = false;
    this.isAddFormVisible = true;
    this.modifyButtonsDisabled = this.modifyButtonsDisabled.map(() => false);
  }

}

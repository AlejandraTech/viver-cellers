import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Define form control property of type formGroup.
  register!: FormGroup;

  constructor() {
    this.register = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("[a-z]+")]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$")]),
      dni: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatpassword: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      postalcode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern("^[0-9]+$")])
    })
  }

  // Submit the record.
  submit(): void {
    console.log("Validaciones correctas");

  }
}

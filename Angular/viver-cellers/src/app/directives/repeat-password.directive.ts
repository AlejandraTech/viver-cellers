// Import necessary Angular dependencies
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Define a custom directive to validate password repetition
@Directive({
  selector: '[appRepeatPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RepeatPasswordDirective, multi: true }]
})
export class RepeatPasswordDirective implements Validator {

  // Capture the value coming from the form
  @Input('appRepeatPassword') password1!: string;

  constructor() {

  }

  // Implement a custom validation method
  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    // Store the value of the repeated password control
    let repetitPassword = control.value;

    // Get the initial password control using the name provided as input in real-time
    let passwordInicial = control.root.get(this.password1);

    // Check for a discrepancy between the passwords and return a custom error if there is one
    if (passwordInicial != null && repetitPassword != passwordInicial.value) {
      return { custom: true }; // Enviamos un flag que indica un error personalizado
    }

    // If passwords match, return null indicating validation has passed
    return null;
  }
}

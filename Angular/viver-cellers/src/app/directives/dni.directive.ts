// This file defines an Angular custom directive for validating national identification numbers (DNI).

import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appDni]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DniDirective, multi: true }]
})
export class DniDirective {
  // This @Input directive is used to receive the ID number as input from the parent component.
  // The name 'appDni' is used to refer to this entry in the parent component.
  @Input('appDni') dni!: string;

  constructor() { }

  // This `validate` function performs the DNI validation logic.
  validate(control: AbstractControl): ValidationErrors | null {
    const dni = control.value; // Gets the value of the form control that is being validated.
    const valid = verificaDNI(dni); // Call the verifyDNI function to validate the DNI.

    // If the ID is not valid, returns a custom errors object.
    if (!valid) {
      return { custom: true };
    }

    return null;
  }
}

// This `verifyDNI` function is used to check if an DNI is valid.
function verificaDNI(dni: string): boolean {
  const lletres = "TRWAGMYFPDXBNJZSQVHLCKE";// Letters used to calculate the DNI check digit.
  const num = dni.slice(0, -1);// Gets the digits of the DNI number (without the control letter).
  const lle = dni.slice(-1);// Obtains the control letter of the DNI.
  const residu = parseInt(num) % 23;// Calculates the remainder of the division of the DNI number by 23.
  const lletraBona = lletres[residu];// Gets the expected control letter for the DNI number.

  // Compares the expected control letter with the control letter provided in the DNI.
  // Returns true if they match (indicating that the ID is valid), otherwise returns false.
  return lletraBona === lle.toUpperCase();
}

// Importamos las necesarias dependencias de Angular
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appDni]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DniDirective, multi: true }]
})
export class DniDirective {

  @Input('appDni') dni!: string;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const dni = control.value;
    const valid = verificaDNI(dni);

    if (!valid) {
      return { custom: true };
    }

    return null;
  }
}

function verificaDNI(dni: string): boolean {
  const lletres = "TRWAGMYFPDXBNJZSQVHLCKE";
  const num = dni.slice(0, -1);
  const lle = dni.slice(-1);
  const residu = parseInt(num) % 23;
  const lletraBona = lletres[residu];

  return lletraBona === lle.toUpperCase();
}





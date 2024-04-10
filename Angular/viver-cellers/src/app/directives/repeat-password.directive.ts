// Importamos las necesarias dependencias de Angular
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Definimos una directiva personalizada para validar la repetición de contraseñas
@Directive({
  selector: '[appRepeatPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RepeatPasswordDirective, multi: true }]
})
export class RepeatPasswordDirective implements Validator {

  // Capturamos el valor que proviene del formulario
  @Input('appRepeatPassword') password1!: string;

  constructor() {
    // Constructor vacío, no realizamos ninguna acción especial al crear la instancia de la directiva
  }

  // Implementamos un método de validación personalizado
  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    // Almacenamos el valor del control de la contraseña repetida
    let repetitPassword = control.value;

    // Obtenemos el control de la contraseña inicial utilizando el nombre proporcionado como input en tiempo real
    let passwordInicial = control.root.get(this.password1);

    // Verificamos si hay una discrepancia entre las contraseñas y devolvemos un error personalizado si es así
    if (passwordInicial != null && repetitPassword != passwordInicial.value) {
      return { custom: true }; // Enviamos un flag que indica un error personalizado
    }

    // Si las contraseñas coinciden, devolvemos null indicando que la validación ha pasado
    return null;
  }
}

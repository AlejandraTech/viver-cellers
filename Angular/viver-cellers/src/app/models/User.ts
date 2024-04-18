export class User {
  #id?: number;
  #id_province_fk?: number;
  #name?: string;
  #dni?: string;
  #lastname?: string;
  #email?: string;
  #password?: string;
  #rol?: 'client' | 'nurseryman' | 'admin';
}

// export class User {
//   constructor(name: string, lastname: string, email: string, password: string,
//     rol: string, dni: string ='') {
//     this.#name = name;
//     this.#dni = dni;
//     this.#lastname = lastname;
//     this.#email = email;
//     this.#password = password;
//     this.#rol = rol;
//   }

//   get name(): string {
//     return this.#name
//   }

//   get dni(): string {
//     return this.#dni
//   }

//   get lastname(): string {
//     return this.#lastname
//   }

//   get email(): string {
//     return this.#email
//   }

//   get password(): string {
//     return this.#password;
//   }

//   get rol(): string {
//     return this.#rol
//   }

//   set name(name: string) {
//     this.#name = name;
//   }


//   set lastname(lastname: string) {
//     this.#lastname = lastname;
//   }

//   set dni(dni: string) {
//     this.#dni = dni;
//   }

//   set email(email: string) {
//     this.#email = email;
//   }

//   set password(password: string) {
//     this.#password = password;
//   }

//   set rol(rol: string) {
//     this.#rol = rol;
//   }

// }

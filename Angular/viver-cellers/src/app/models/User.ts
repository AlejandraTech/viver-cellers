/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * User class with the fields of the users table
 */
export class User {
  #id?: number;
  #name?: string;
  #dni?: string;
  #lastname?: string;
  #email?: string;
  #password?: string;
  #rol?: 'client' | 'nurseryman' | 'admin';
}

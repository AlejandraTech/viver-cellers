export class User {
  #id?: number;
  #name?: string;
  #dni?: string;
  #lastname?: string;
  #email?: string;
  #password?: string;
  #rol?: 'client' | 'nurseryman' | 'admin';
}

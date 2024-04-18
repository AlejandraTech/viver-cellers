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

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{
  users: any[] = []; // Aquí almacenarías los usuarios obtenidos de la base de datos

  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.ListUsers();
  }



  ListUsers(): void {
    this.service.getUsers().subscribe(
      data => {
        this.users = data;
        console.log('Datos recibidos:', data);
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }


  isModifyFormVisible: boolean = false;
  isAddFormVisible: boolean = true;
  modifyButtonsDisabled: boolean[] = [];

  toggleModifyFormVisibility(index: number) {
    this.isModifyFormVisible = true;
    this.isAddFormVisible = false;
    this.modifyButtonsDisabled[index] = true;
  }

  cancelar() {
    this.isModifyFormVisible = false;
    this.isAddFormVisible = true;
    this.modifyButtonsDisabled = this.modifyButtonsDisabled.map(() => false);
  }
}

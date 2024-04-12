import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  users: any[] = []; // Aquí almacenarías los usuarios obtenidos de la base de datos

  constructor() { }

  ngOnInit(): void {
    // Aquí podrías hacer una petición HTTP para obtener los usuarios de la base de datos
    // this.userService.getUsers().subscribe((users) => {
    //   this.users = users;
    // });
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

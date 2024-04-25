// This component handles project management, including adding, modifying, and deleting projects.


// Necessary imports from Angular and related services
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {
  // Array to store users fetched from the database
  projects: any[] = [];

  // Selected project identifier for modification
  projectId: any;

  // Variable to store the success message
  successMessage: string = '';
  // Error message to display to the user in case of issues
  errorMessage: string = '';

  // Array to store project data for modification
  modifyprojects: any = [];

  // Define form control
  addproject!: FormGroup; // Define form control property of type formGroup to add projects
  modifyproject!: FormGroup; // Define form control property of type formGroup to modify users


  constructor(private service: ProjectService) { }

  // Method executed when the component initializes
  ngOnInit(): void {
    // Get the list of projects
    this.getProjects();


    // Initialize the form for adding users
    this.addproject = new FormGroup({
      project_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      definition: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      stories: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)])
    });

    // Initialize the form for modifying users
    this.modifyproject = new FormGroup({
      project_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      definition: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      stories: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)])
    });


  }


  // Method to fetch the list of users from the service
  getProjects(): void {
    this.service.getProjects().subscribe(
      data => {
        this.projects = data.data;
      },
      error => {
        console.error(`Error en la recuperació de projectes:`, error);
      }
    );
  }


  /**
  * Method to add a new project from the form, only allowed for the administrator
  */
  submitAdd(): void {
    if (this.addproject.valid) {
      const projectData = {
        project_name: this.addproject.value.project_name,
        definition: this.addproject.value.definition,
        description: this.addproject.value.description,
        stories: this.addproject.value.stories
      };
      // Call the service to add a new project
      this.service.postProjects(projectData)
        .subscribe(
          response => {
            this.getProjects(); // Update the list of projects after addition
            this.successMessage = 'Projecte afegit amb èxit.';
            this.errorMessage = '';
          },
          error => {
            // Handle errors related to adding projects
            if (error.status === 422) {
              this.successMessage = '';
              this.errorMessage = "S'ha produït un error. Si us plau, intenta-ho de nou més tard";
            } else {
              this.successMessage = '';
              this.errorMessage = 'Projecte ja registrat. Si us plau, prova amb un altre nom';
            }
          }
        );
    }
  }

  // Method to submit the project modification form
  onSubmit(): void {
    if (this.modifyproject.valid) {
      const projectData = {
        project_name: this.modifyproject.value.project_name,
        definition: this.modifyproject.value.definition,
        description: this.modifyproject.value.description,
        stories: this.modifyproject.value.stories

      };
      // Call the service to update project data
      this.service.updateProject(projectData, this.projectId)
        .subscribe(
          response => {
            this.getProjects(); // Update the list of projects after modification
            this.isModifyFormVisible = false; // Hide the modification form after sending the request
            this.isAddFormVisible = true; // Show add form
            this.successMessage = 'Projecte modificat amb èxit.';
            this.errorMessage = ``;
          },
          error => {
            this.errorMessage = "S'ha produït un error mentre es modificava el projecte. Si us plau, intenta-ho de nou més tard.";
            this.successMessage = '';
          }
        );
    }
  }

  // Method to delete a user
  deleteProject(projectId: number): void {
    this.service.deleteProject(projectId).subscribe(
      response => {
        this.getProjects();
        this.successMessage = `El projecte s'ha eliminat amb èxit.`;
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = `S'ha produït un error mentre es modificava el projecte. Si us plau, torni a intentar-ho més tard.`;
        this.successMessage = '';
      }
    );
  }

  // Properties to control the visibility of forms and modification buttons
  isModifyFormVisible: boolean = false;
  isAddFormVisible: boolean = true;
  modifyButtonsDisabled: boolean[] = [];

  // Method to toggle the visibility of the modification form
  toggleModifyFormVisibility(projectId: any) {
    console.log(`Identificador de projecte seleccionat:`, projectId);
    this.projectId = projectId;
    this.isModifyFormVisible = true;
    this.isAddFormVisible = false;
  }

  // Method to cancel project modification and return to the addition form
  cancelar() {
    this.isModifyFormVisible = false;
    this.isAddFormVisible = true;
    this.modifyButtonsDisabled = this.modifyButtonsDisabled.map(() => false);
  }

}



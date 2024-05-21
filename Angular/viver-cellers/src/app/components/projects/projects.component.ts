import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  // Array to store the projects fetched from the server.
  projects: Project[] = [];

  // Constructor to inject the ProjectService dependency.
  constructor(private projectService: ProjectService) { }

  // Lifecycle hook that runs after the component is initialized.
  ngOnInit(): void {
    this.loadProjects();
  }

  // Loads the projects from the service.
  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      // Assigns the fetched projects to the component property.
      (data: Project[]) => {
        this.projects = data;
      },
      error => {
        console.error('Error fetching products: ', error);
      }
    );
  }
}

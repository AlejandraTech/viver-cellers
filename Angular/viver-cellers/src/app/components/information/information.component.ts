import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  // Call of the method loadproject
  ngOnInit(): void {
    this.loadProjects();
  }

  // Method to load all projects
  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      // Call the service to get all projects
      (data: Project[]) => {
        // Assigns the data of the projects obtained to the variable `projects`
        this.projects = data;
      },
      error => {
        console.error('Error fetching products: ', error);
      }
    );
  }
}

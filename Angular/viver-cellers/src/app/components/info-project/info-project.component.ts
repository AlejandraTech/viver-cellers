import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-info-project',
  templateUrl: './info-project.component.html',
  styleUrls: ['./info-project.component.css']
})
export class InfoProjectComponent implements OnInit {
  projects: any[] = [];

  constructor(private service: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getProjectDetails(id).subscribe(data => {
      this.projects = [data];
    });
  }
}

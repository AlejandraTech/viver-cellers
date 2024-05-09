import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-info-project',
  templateUrl: './info-project.component.html',
  styleUrls: ['./info-project.component.css']
})
export class InfoProjectComponent implements OnInit {
  projects: any[] = [];
  products: any[] = [];
  project_id!: number;

  constructor(private projectService: ProjectService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.project_id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProjectDetails(this.project_id).subscribe(
      data => {
        this.projects = [data];
      },
      error => {
        console.error(`Error retrieving project details:`, error);
        // Redirect to error page if project not found
        this.router.navigate(['/error']);
      }
    );
    this.getProduct();
  }

  getProduct(): void {
    this.productService.getProduct().subscribe(
      data => {
        this.products = data.data;
      },
      error => {
        console.error(`Error retrieving products:`, error);
      }
    );
  }
}

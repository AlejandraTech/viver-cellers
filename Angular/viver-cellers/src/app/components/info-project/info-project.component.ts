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
  project: any = {};
  products: any[] = [];
  project_id!: number;
  galleryImages: string[] = [];

  constructor(
    private projectService: ProjectService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.project_id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProjectDetails(this.project_id).subscribe(
      data => {
        this.project = data;
        this.setGalleryImages(this.project.project_name);
      },
      error => {
        console.error(`Error retrieving project details:`, error);
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

  setGalleryImages(projectName: string): void {
    const imagePaths = [
      `../../../assets/img/projects/${projectName}/${projectName}1.png`,
      `../../../assets/img/projects/${projectName}/${projectName}2.png`,
      `../../../assets/img/projects/${projectName}/${projectName}3.png`
    ];

    imagePaths.forEach(imagePath => {
      this.checkImageExists(imagePath).then(exists => {
        if (exists) {
          this.galleryImages.push(imagePath);
        }
      });
    });
  }

  checkImageExists(url: string): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }
}

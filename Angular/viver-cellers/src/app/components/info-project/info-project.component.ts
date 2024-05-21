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
    // Gets the project ID from the path parameters and converts it to a number
    this.project_id = Number(this.route.snapshot.paramMap.get('id'));
    // Call the service to get the project details
    this.projectService.getProjectDetails(this.project_id).subscribe(
      data => {
        // Assigns the obtained project data to the `project` variable
        this.project = data;
        this.setGalleryImages(this.project.project_name);
      },
      error => {
        // In case of error while getting project details, print the error to the console
        console.error(`Error retrieving project details:`, error);
        this.router.navigate(['/error']);
      }
    );
    this.getProduct();
  }

  //Call the service to get the product list
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
    // Define image paths based on the project name
    const imagePaths = [
      `../../../assets/img/projects/${projectName}/${projectName}1.png`,
      `../../../assets/img/projects/${projectName}/${projectName}2.png`,
      `../../../assets/img/projects/${projectName}/${projectName}3.png`
    ];
    // Iterate over each image path and check if it exists
    imagePaths.forEach(imagePath => {
      this.checkImageExists(imagePath).then(exists => {
        if (exists) {
          this.galleryImages.push(imagePath);
        }
      });
    });
  }

  /*
    Check if an image exists at the given URL
    - Returns a promise that resolves to `true` if the image loads successfully.
    - If there is an error loading the image, the promise resolves to `false`.
  */
  checkImageExists(url: string): Promise<boolean> {
    return new Promise(resolve => {
      // Create a new instance of the Image class
      const img = new Image();
      img.src = url;

      /*
        * Handle the `onload` event
        * This event is fired when the image is loaded successfully.
        * Resolve the promise with `true`.
    */
      img.onload = () => resolve(true);

      /*
        * Handle the `onerror` event
        * This event is fired when there is an error loading the image.
        * Resolve the promise with `false`.
      */
      img.onerror = () => resolve(false);
    });
  }
}

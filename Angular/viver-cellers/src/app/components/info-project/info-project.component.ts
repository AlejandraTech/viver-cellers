import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProductService } from 'src/app/services/product.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-info-project',
  templateUrl: './info-project.component.html',
  styleUrls: ['./info-project.component.css']
})
export class InfoProjectComponent implements OnInit {
  // Array to store projects fetched from the database
  projects: any[] = [];

  // Array to store products fetched from the database
  products: any[] = [];

  project_id!: number;

  constructor(private service: ProjectService, private serviceProducts: ProductService, private route: ActivatedRoute) { }

  /**
   * Method executed when the component initializes
   */
  ngOnInit(): void {

    //get the project id and convert it to number
    this.project_id = Number(this.route.snapshot.paramMap.get('id'));

    //call the service to get all the information about the project
    this.service.getProjectDetails(this.project_id).subscribe(data => {
      this.projects = [data];
    });

    // Get the list of product and available vineyard
    this.getProduct();
  }

  /**
   * Method to fetch the list of product from the service
   */
  getProduct(): void {
    this.serviceProducts.getProduct().subscribe(
      data => {
        this.products = data.data;
        console.log(this.products);
      },
      error => {
        console.error(`Error en la recuperació de productes:`, error);
      }
    );
  }
}

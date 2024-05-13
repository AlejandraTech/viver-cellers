import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Project } from 'src/app/models/Project';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = []; //array with all products
  projects: Project[] = []; //array with all projects

  categories: any[] = []; //array with all categories
  varieties: any[] = []; //array with all varieties

  selectedProjectId!: number; //variable that stores the project id of the project selected by the filter
  selectedCategoryId!: number; //variable that stores the category id of the category selected by the filter
  selectedVarietyId!: number; //variable that stores the variety id of the variety selected by the filter

  areFiltersEnabled = true; //Variable that controls if filters are enabled

  constructor(private productService: ProductService, private projectService: ProjectService, private cartService: CartService) {

  }

  /**
   * Method executed when the component initializes
   */
  ngOnInit(): void {
    this.loadProducts();
    this.loadProjects();
    this.loadCategories();
    this.loadVarieties();

  }

  /**
   * Call the service to collect all projects from the database.
   */
  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (data: Project[]) => {
        this.projects = data;
      },
      error => {
        console.error('Error fetching products: ', error);
      }
    );
  }

  /**
   * Stores the chosen project id
   * @param projectId project id field
   */
  selectProject(projectId: number): void {
    if (this.areFiltersEnabled) {
      this.selectedProjectId = projectId;
      this.loadProducts();
    }
  }

  /**
   * Call the service to collect all categories from the database.
   */
  loadCategories(): void {
    this.productService.getCategory().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      },
      error => {
        console.error('Error fetching categories: ', error);
      }
    );
  }

  /**
  * Stores the chosen category id
  * @param categoryId category id field
  */
  selectCategory(categoryId: number): void {
    if (this.areFiltersEnabled) {
      this.selectedCategoryId = categoryId;
      this.loadProducts();
    }
  }

  /**
   * Call the service to collect all varieties from the database.
   */
  loadVarieties(): void {
    this.productService.getVariety().subscribe(
      data => {
        this.varieties = data;
        console.log(this.varieties);
      },
      error => {
        console.error('Error fetching varieties: ', error);
      }
    );
  }

  /**
  * Stores the chosen variety id
  * @param varietyId variety id field
  */
  selectVariety(varietyId: number): void {
    if (this.areFiltersEnabled) {
      this.selectedVarietyId = varietyId;
      this.loadProducts();
    }
  }

  /**
   * Call the service to collect all products from the database.
   */
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        // Initializes the list of products to be displayed
        let filteredProducts = data;

        // Applies each selected filter to the product list
        if (this.selectedProjectId) {
          filteredProducts = filteredProducts.filter(product => product.project_id === this.selectedProjectId);
        }
        if (this.selectedCategoryId) {
          filteredProducts = filteredProducts.filter(product => product.id_type_wine_fk === this.selectedCategoryId);
        }
        if (this.selectedVarietyId) {
          filteredProducts = filteredProducts.filter(product => product.id_type_variety_fk === this.selectedVarietyId);
        }

        // Updates product list with filtered results
        this.products = filteredProducts;
        console.log(this.products);
      },
      error => {
        console.error('Error fetching products: ', error);
      }
    );
  }

  toggleFilters(): void {
    this.areFiltersEnabled = !this.areFiltersEnabled;
    // Si los filtros están deshabilitados, resetea las selecciones de filtros
    if (!this.areFiltersEnabled) {
      this.productService.getAllProducts().subscribe(
        (data: Product[]) => {
          this.products = data;

        }
      );
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  isInCart(product: Product): boolean {
    return this.cartService.isInCart(product);
  }

  getQuantityInCart(product: Product): number {
    return this.cartService.getQuantityInCart(product);
  }
}

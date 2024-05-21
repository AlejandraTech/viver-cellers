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
  //Arrays
  products: Product[] = [];
  projects: Project[] = [];
  categories: any[] = [];
  varieties: any[] = [];
  selectedProjectId: number | null = null;
  selectedCategoryId: number | null = null;
  selectedVarietyId: number | null = null;
  areFiltersEnabled = true;
  projectFilterSelected = false;
  categoryFilterSelected = false;
  varietyFilterSelected = false;

  constructor(private productService: ProductService, private projectService: ProjectService, private cartService: CartService) { }

  // Initializes the component by loading products, projects, categories, and varieties.
  ngOnInit(): void {
    this.loadProducts();
    this.loadProjects();
    this.loadCategories();
    this.loadVarieties();
  }

  // Loads projects from the project service.
  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (data: Project[]) => {
        this.projects = data;
      },
      error => {
        console.error('Error fetching projects: ', error);
      }
    );
  }

  // Selects a project and filters products accordingly.
  selectProject(projectId: number | null): void {
    this.selectedProjectId = projectId; // Sets the selected project ID.
    this.projectFilterSelected = projectId !== null; // Updates the project filter status.
    this.loadProducts();
  }

  // Loads categories from the product service.
  loadCategories(): void {
    this.productService.getCategory().subscribe(
      data => {
        this.categories = data; // Assigns fetched categories to the component property.
      },
      error => {
        console.error('Error fetching categories: ', error);
      }
    );
  }

  // Selects a category and filters products accordingly.
  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.categoryFilterSelected = categoryId !== null;
    this.loadProducts();
  }

  // Loads varieties from the product service.
  loadVarieties(): void {
    this.productService.getVariety().subscribe(
      data => {
        this.varieties = data;
      },
      error => {
        console.error('Error fetching varieties: ', error);
      }
    );
  }

  // Selects a variety and filters products accordingly.
  selectVariety(varietyId: number | null): void {
    this.selectedVarietyId = varietyId;
    this.varietyFilterSelected = varietyId !== null;
    this.loadProducts();
  }

  // Loads products from the product service and applies filters based on selected projects, categories, and varieties.
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        let filteredProducts = data; // Initialize filtered products with all products.

        // Apply filters based on selected project, category, and variety.
        if (this.selectedProjectId !== null) {
          filteredProducts = filteredProducts.filter(product => product.project_id === this.selectedProjectId);
        }
        if (this.selectedCategoryId !== null) {
          filteredProducts = filteredProducts.filter(product => product.id_type_wine_fk === this.selectedCategoryId);
        }
        if (this.selectedVarietyId !== null) {
          filteredProducts = filteredProducts.filter(product => product.id_type_variety_fk === this.selectedVarietyId);
        }

        this.products = filteredProducts;
      },
      error => {
        console.error('Error fetching products: ', error);
      }
    );
  }

  // This function toggles the visibility of filters.
  toggleFilters(): void {
    this.areFiltersEnabled = !this.areFiltersEnabled;// Toggles the state of filters (enabled/disabled).
    // If filters are being disabled, reset selected filter values and reload products.
    if (!this.areFiltersEnabled) {
      this.selectedProjectId = null; // Reset selected project filter value.
      this.selectedCategoryId = null; // Reset selected category filter value.
      this.selectedVarietyId = null; // Reset selected variety filter value.
      this.projectFilterSelected = false; // Reset project filter selection status.
      this.categoryFilterSelected = false; // Reset category filter selection status.
      this.varietyFilterSelected = false; // Reset variety filter selection status.
      this.loadProducts(); // Reload products without applying filters.
    }
  }

  // This function is used to add a product to the shopping cart.
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  // This function is used to remove a product from the shopping cart.
  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  // This function is used to check if a product is in the shopping cart.
  isInCart(product: Product): boolean {
    return this.cartService.isInCart(product);// Calls the isInCart method of the shopping cart service, passing the product as an argument, and returns true if the product is in the cart, otherwise returns false.
  }

  // This function is used to get the quantity of a product in the shopping cart.
  getQuantityInCart(product: Product): number {
    return this.cartService.getQuantityInCart(product);// Calls the getQuantityInCart method of the shopping cart service, passing the product as an argument, and returns the quantity of the product in the cart.
  }
}

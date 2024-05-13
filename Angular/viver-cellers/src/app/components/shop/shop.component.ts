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

  ngOnInit(): void {
    this.loadProducts();
    this.loadProjects();
    this.loadCategories();
    this.loadVarieties();
  }

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

  selectProject(projectId: number | null): void {
    this.selectedProjectId = projectId;
    this.projectFilterSelected = projectId !== null;
    this.loadProducts();
  }

  loadCategories(): void {
    this.productService.getCategory().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories: ', error);
      }
    );
  }

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.categoryFilterSelected = categoryId !== null;
    this.loadProducts();
  }

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

  selectVariety(varietyId: number | null): void {
    this.selectedVarietyId = varietyId;
    this.varietyFilterSelected = varietyId !== null;
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        let filteredProducts = data;

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

  toggleFilters(): void {
    this.areFiltersEnabled = !this.areFiltersEnabled;
    if (!this.areFiltersEnabled) {
      this.selectedProjectId = null;
      this.selectedCategoryId = null;
      this.selectedVarietyId = null;
      this.projectFilterSelected = false;
      this.categoryFilterSelected = false;
      this.varietyFilterSelected = false;
      this.loadProducts();
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

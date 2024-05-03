import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {

  // Array to store product fetched from the database
  products: any[] = [];
  vineyards: any[] = [];
  projects: any[] = [];

  // Selected product identifier for modification
  productId: any;
  // Variable to store the success message
  successMessage: string = '';
  // Error message to display to the product in case of issues
  errorMessage: string = '';
  // Array to store product data for modification
  modifyproducts: any = [];

  // Define form control
  addproduct!: FormGroup; // Define form control property of type formGroup to add product
  modifyproduct!: FormGroup; // Define form control property of type formGroup to modify product


  constructor(private service: ProductService, private serviceProject: ProjectService) { }

  /**
   * Method executed when the component initializes
   */
  ngOnInit(): void {
    // Get the list of product and available vineyard
    this.getproduct();

    this.getProjects();

    this.addproduct = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      winemaking: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]),
      grade_alcohol: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0)
      ]),
      stock: new FormControl('', [
        Validators.required,
        Validators.pattern("/^[0-9]+$/;"),
        Validators.min(0)
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern("/^[0-9]+[.,]{1,1}\[0]{2,2}$/"),
        Validators.min(0)
      ]),
      iva: new FormControl('', [
        Validators.required,
        Validators.pattern("/^[0-9]+$/;"),
        Validators.min(0)
      ]),
      project_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      vineyard_area: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)
      ]),
      type_wine: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$"),
        Validators.minLength(2),
        Validators.maxLength(150)
      ]),
      type_variety: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$"),
        Validators.minLength(2),
        Validators.maxLength(150)
      ]),
    });

  }

  /**
   * Method to fetch the list of product from the service
   */
  getproduct(): void {
    this.service.getProduct().subscribe(
      data => {
        this.products = data.data;
        console.log(this.products);
      },
      error => {
        console.error(`Error en la recuperació de productes:`, error);
      }
    );
  }

  /**
   * Method to fetch the list of projects from the service
   */
  getProjects(): void {
    this.serviceProject.getProjects().subscribe(
      data => {
        this.projects = data.data;
      },
      error => {
        console.error(`Error en la recuperació de projectes:`, error);
      }
    );
  }

  /**
   * Method to add a new product from the form, only allowed for the administrator
   */
  submitAdd(): void {

    if (this.addproduct.valid) {
      const productData = {
        name: this.addproduct.value.name,
        winemaking: this.addproduct.value.winemaking,
        vineyard_area: this.addproduct.value.vineyard_area,
        grade_alcohol: this.addproduct.value.grade_alcohol,
        iva: this.addproduct.value.iva,
        price: this.addproduct.value.price,
        type_wine: this.addproduct.value.type_wine,
        type_variety: this.addproduct.value.type_variety,
        stock: this.addproduct.value.stock,
        project_name: this.addproduct.value.project_name,

      };


      // Call the service to add product data
      this.service.postProduct(productData)
        .subscribe(
          response => {
            this.getproduct(); // Update the product list after adding a new one
            // Clear form fields after adding
            this.addproduct.reset();
            this.successMessage = 'Productw afegit amb èxit.';
            this.errorMessage = '';
          },
          error => {
            this.errorMessage = "S'ha produït un error en afegir el producte. Si us plau, torna-ho a intentar més tard";
            this.successMessage = '';
          }
        );
    }
  }

  /**
   * Method to submit the product modification form
   */
  onSubmit(): void {
    if (this.modifyproduct.valid) {
      const productData = {
        name: this.modifyproduct.value.name,
        winemaking: this.modifyproduct.value.winemaking,
        vineyard_area: this.modifyproduct.value.vineyard_area,
        grade_alcohol: this.modifyproduct.value.grade_alcohol,
        iva: this.modifyproduct.value.iva,
        price: this.modifyproduct.value.price,
        type_wine: this.modifyproduct.value.type_wine,
        type_variety: this.modifyproduct.value.type_variety,
        stock: this.modifyproduct.value.stock,
        project_name: this.modifyproduct.value.project_name,
      };
      // Call the service to update product data
      this.service.updateProduct(productData, this.productId)
        .subscribe(
          response => {
            this.getproduct(); // Update the list of product after modification
            this.isModifyFormVisible = false; // Hide the modification form after sending the request
            this.isAddFormVisible = true; // Show add form
            this.successMessage = 'Producte modificat amb èxit.';
            this.errorMessage = '';
          },
          error => {
            this.errorMessage = `S'ha produït un error mentre es modificava el producte. Si us plau, intenta-ho de nou més tard.`;
            this.successMessage = '';
          }
        );
    }
  }

  /**
   * Method to delete a product
   * @param productId product identifier
   */
  deleteProduct(productId: number): void {
    this.service.deleteProduct(productId).subscribe(
      response => {
        this.getproduct();
        this.successMessage = `El producte s'ha eliminat amb èxit.`;
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = `S'ha produït un error mentre es modificava el producte. Si us plau, torni a intentar-ho més tard.`;
        this.successMessage = '';
      }
    );
  }

  // Properties to control the visibility of forms and modification buttons
  isModifyFormVisible: boolean = false;
  isAddFormVisible: boolean = true;
  modifyButtonsDisabled: boolean[] = [];

  /**
   * Method to toggle the visibility of the modification form
   * @param productId product identifier
   */
  toggleModifyFormVisibility(productId: any) {
    console.log(`Identificador del producte seleccionat:`, productId);
    this.productId = productId;

    // Search for the selected project in the product list
    const selectedProduct = this.products.find(p => p.id === productId);

    // Initialize the modification form with the selected product
    if (selectedProduct) {
      this.modifyproduct = new FormGroup({
        name: new FormControl(selectedProduct.name, [Validators.required]),
        winemaking: new FormControl(selectedProduct.winemaking, [Validators.required]),
        vineyard_area: new FormControl(selectedProduct.vineyard_area.area, [Validators.required]),
        grade_alcohol: new FormControl(selectedProduct.grade_alcohol, [Validators.required]),
        iva: new FormControl(selectedProduct.iva, [Validators.required]),
        price: new FormControl(selectedProduct.price, [Validators.required]),
        type_wine: new FormControl(selectedProduct.type_wine.category, [Validators.required]),
        type_variety: new FormControl(selectedProduct.type_variety.variety, [Validators.required]),
        stock: new FormControl(selectedProduct.stock, [Validators.required]),
        project_name: new FormControl(selectedProduct.project.id, [Validators.required]),
      });
    } else {
      // If the product is not found, initialize the empty form.
      this.modifyproduct = new FormGroup({

        name: new FormControl('', [Validators.required]),
        winemaking: new FormControl('', [Validators.required]),
        vineyard_area: new FormControl('', [Validators.required]),
        grade_alcohol: new FormControl('', [Validators.required]),
        iva: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        type_wine: new FormControl('', [Validators.required]),
        type_variety: new FormControl('', [Validators.required]),
        stock: new FormControl('', [Validators.required]),
        project_name: new FormControl('', [Validators.required]),
      });
    }

    this.isModifyFormVisible = true;
    this.isAddFormVisible = false;
  }

  // Method to cancel user modification and return to the addition form
  cancelar() {
    this.isModifyFormVisible = false;
    this.isAddFormVisible = true;
    this.modifyButtonsDisabled = this.modifyButtonsDisabled.map(() => false);
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Department } from '../models/department';
import { Product } from '../models/product';
import { DepartmentService } from '../services/department/department.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private departmentsService: DepartmentService,
    private snackbar: MatSnackBar
  ) { }

  @ViewChild('formRef', { static: true }) formRef: NgForm;
  private unsubscribe$ = new Subject<any>();

  productForm: FormGroup = this.formBuilder.group({
    _id: [null],
    name: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(0)]],
    price: [0, [Validators.required, Validators.min(0)]],
    departments: [[], [Validators.required]]
  });

  products: Product[] = [];
  departments: Department[] = [];

  ngOnInit(): void {
    this.productService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(products => this.products = products);

    this.departmentsService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(departments => this.departments = departments);
  }

  saveProduct() {
    const data: Product = this.productForm.value;
    if (data._id != null) {
      this.productService.update(data).subscribe(() => {
        this.notify('Updated!');
        this.resetForm();
      },
        (error) => console.log(error));
    } else {
      this.productService.add(data).subscribe(() => {
        this.notify('Saved!');
        this.resetForm();
      },
        (error) => console.log(error));
    }
  }

  deleteProduct(product: Product) {
    this.productService.delete(product).subscribe(() => this.notify('Deleted!'),
      (error) => console.log(error));
  }

  editProduct(product: Product) {
    this.productForm.setValue(product);
  }

  notify(message: string) {
    this.snackbar.open(message, 'Ok', { duration: 3000 });
  }

  resetForm() {
    this.formRef.resetForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

}

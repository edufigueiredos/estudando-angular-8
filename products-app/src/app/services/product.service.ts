import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';
import { DepartmentService } from './department.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dataFromServer: any[] = [
    { id: 1, name: 'Laptop', department_id: 4, price: 40, description: 'Laptop Description' },
    { id: 2, name: 'Shirt', department_id: 1, price: 10, description: 'Shirt Description' },
    { id: 3, name: 'Polo', department_id: 1, price: 50, description: 'Polo Description' },
    { id: 4, name: 'Mouse', department_id: 3, price: 40, description: 'Mouse Description' },
  ]

  private products: Product[] = [];
  private nextId: number;

  onNewProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    private departmentService: DepartmentService
  ) {
    for (const product of this.dataFromServer) {
      this.products.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        department: this.departmentService.getDepartmentById(product.id)
      });
      this.nextId = product.id + 1;
    }
  }

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product) {
    const newProduct: Product = { id: this.nextId++, ...product };
    this.products.push(newProduct);
    console.log(this.products);
    this.onNewProduct.emit(newProduct);
  }

}

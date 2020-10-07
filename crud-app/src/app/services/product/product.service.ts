import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { Product } from 'src/app/models/product';
import { DepartmentService } from '../department/department.service';
import { Department } from 'src/app/models/department';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3000/products';
  private productsSubject$ = new BehaviorSubject<Product[]>(null);
  private loaded = false;

  constructor(
    private http: HttpClient,
    private departmentService: DepartmentService
  ) { }

  get(): Observable<Product[]> {
    if (!this.loaded) {
      combineLatest([
        this.http.get<Product[]>(this.url),
        this.departmentService.get()
      ]).pipe(
        filter(([products, departments]) => products != null && departments != null),
        map(([products, departments]) => {
          for (const product of products) {
            const ids = (product.departments as string[]);
            product.departments = ids.map((id) => departments.find(dep => dep._id === id));
          }
          return products;
        })
      ).subscribe(this.productsSubject$);

      this.loaded = true;
    }
    return this.productsSubject$.asObservable();
  }

  add(product: Product): Observable<Product> {
    const departments = (product.departments as Department[]).map(department => department._id);
    return this.http.post<Product>(this.url, { ...product, departments }).pipe(
      tap((newProduct) => {
        this.productsSubject$.getValue().push({ ...newProduct, _id: newProduct._id, departments: product.departments });
      })
    );
  }

  delete(product: Product): Observable<any> {
    return this.http.delete(`${this.url}/${product._id}`).pipe(
      tap(() => {
        const products = this.productsSubject$.getValue();
        const index = products.findIndex(indexProduct => indexProduct._id === product._id);
        if (index >= 0) {
          products.splice(index, 1);
        }
      })
    );
  }

  update(product: Product): Observable<Product> {
    const departments = (product.departments as Department[]).map(department => department._id);
    return this.http.patch<Product>(`${this.url}/${product._id}`, { ...product, departments }).pipe(
      tap(() => {
        const products = this.productsSubject$.getValue();
        const index = products.findIndex(indexProduct => indexProduct._id === product._id);
        if (index >= 0) {
          products[index] = product;
        }
      })
    );
  }
}

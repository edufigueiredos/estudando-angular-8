import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    private readonly url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.url}/products`);
  }

  getProductsError(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/productserr`);
  }
}
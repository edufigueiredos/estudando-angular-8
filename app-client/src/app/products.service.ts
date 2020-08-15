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

    getProductsDelay(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.url}/productsdelay`);
    }

    getProductsIds(): Observable<string[]> {
        return this.http.get<string[]>(`${this.url}/products/ids`);
    }

    getProductName(id: string): Observable<string> {
        return this.http.get(`${this.url}/product/name/${id}`,
            { responseType: 'text' }
        );
    }

    saveProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.url}/products`, product);
    }

    deleteProduct(product: Product) {
        return this.http.delete(`${this.url}/products/${product._id}`);
    }

    editProduct(product: Product): Observable<Product> {
        return this.http.patch<Product>(`${this.url}/products/${product._id}`, product);
    }
}

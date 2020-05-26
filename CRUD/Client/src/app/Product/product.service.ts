import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';

const productUrl = "http://localhost:5000/api/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[];

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http.get<Product[]>(productUrl)
      .subscribe(p => {
        this.products = p;
      });    
  }

  createProduct(p: Product) {
    this.http.post<number>(
      productUrl, p
    ).subscribe(() => {
      this.getProducts();
    });
  }
}

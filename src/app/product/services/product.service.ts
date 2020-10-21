import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product from 'src/app/shared/interfaces/product.interface';
import { ApiHttpClient } from 'src/app/shared/utils/api-http-client';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: ApiHttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get('/products');
  }

  createProduct(product: Product): Observable<void> {
    return this.httpClient.post('/products', product);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ProductQueryParams from 'src/app/shared/interfaces/product-query-params.interface';
import Product from 'src/app/shared/interfaces/product.interface';
import { ApiHttpClient } from 'src/app/shared/utils/api-http-client';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: ApiHttpClient) {}

  getProducts(queryParams: ProductQueryParams = {}): Observable<Product[]> {
    return this.httpClient.getWithQueryParams('/products', queryParams);
  }

  createProduct(product: Product): Observable<void> {
    return this.httpClient.post('/products', product);
  }
}

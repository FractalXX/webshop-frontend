import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderQueryParams } from 'src/app/shared/interfaces/order-query-params.interface';
import Order from 'src/app/shared/interfaces/order.interface';
import { ApiHttpClient } from 'src/app/shared/utils/api-http-client';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: ApiHttpClient) {}

  getOrdersByQueryParams(queryParams: OrderQueryParams): Observable<Order[]> {
    return this.httpClient.getWithQueryParams('/orders', queryParams);
  }

  placeOrder(order: Order): Observable<void> {
    return this.httpClient.post('/orders', order);
  }
}

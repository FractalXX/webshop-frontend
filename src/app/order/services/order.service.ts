import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderQueryParams } from 'src/app/shared/interfaces/order-query-params.interface';
import Order from 'src/app/shared/interfaces/order.interface';
import Product from 'src/app/shared/interfaces/product.interface';
import { ApiHttpClient } from 'src/app/shared/utils/api-http-client';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: ApiHttpClient) {}

  getOrdersByQueryParams(queryParams: OrderQueryParams): Observable<Order[]> {
    return this.httpClient
      .getWithQueryParams<Order[]>('/orders', queryParams)
      .pipe(
        map((orders) =>
          orders.map((order) => ({
            ...order,
            totalDue: this.getTotalDue(order),
          })),
        ),
      );
  }

  placeOrder(order: Order): Observable<void> {
    return this.httpClient.post('/orders', order);
  }

  getTotalDue(order: Order): number {
    return order.products
      .map(
        (productOrder) =>
          (productOrder.product as Product).price * productOrder.quantity,
      )
      .reduce((previous, acc) => previous + acc);
  }
}

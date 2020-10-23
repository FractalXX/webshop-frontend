import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderQueryParams } from 'src/app/shared/interfaces/order-query-params.interface';
import Order from 'src/app/shared/interfaces/order.interface';
import ProductOrder from 'src/app/shared/interfaces/product-order.interface';
import Product from 'src/app/shared/interfaces/product.interface';
import { ApiHttpClient } from 'src/app/shared/utils/api-http-client';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private currentOrder = new BehaviorSubject<Order>({
    status: null,
    customer: null,
    paymentMethod: null,
    shippingInfo: null,
    billingInfo: null,
    products: [],
    placedAt: null,
    updatedAt: null,
  });

  public get currentOrder$(): Observable<Order> {
    return this.currentOrder.asObservable();
  }

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

  updateCurrentOrder(data: Partial<Order>): void {
    this.currentOrder.next({
      ...this.currentOrder.value,
      ...data,
    });
  }

  addProductToCurrentOrder(product: ProductOrder): void {
    this.updateCurrentOrder({
      products: [...this.currentOrder.value.products, product],
    });
  }
}

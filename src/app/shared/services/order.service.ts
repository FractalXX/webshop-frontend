import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderQueryParams } from 'src/app/shared/interfaces/order-query-params.interface';
import Order from 'src/app/shared/interfaces/order.interface';
import ProductOrder from 'src/app/shared/interfaces/product-order.interface';
import Product from 'src/app/shared/interfaces/product.interface';
import { ApiHttpClient } from 'src/app/shared/utils/api-http-client';
import OrderCreate from '../interfaces/order-create.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly emptyOrder = {
    customer: null,
    paymentMethod: null,
    products: [],
  };

  private currentOrder = new BehaviorSubject<OrderCreate>({
    ...this.emptyOrder,
  });

  public get currentOrder$(): Observable<OrderCreate> {
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
            totalDue: this.getTotalDue(order.products),
          })),
        ),
      );
  }

  getOrderById(id: string): Observable<Order> {
    return this.httpClient
      .get<Order>(`/orders/${id}`)
      .pipe(
        map((order) => ({
          ...order,
          totalDue: this.getTotalDue(order.products),
        })),
      );
  }

  createOrder(order: OrderCreate): Observable<void> {
    return this.httpClient.post('/orders', {
      paymentMethod: order.paymentMethod,
      productOrders: order.products.map((productOrder) => ({
        productId: (productOrder.product as Product).id,
        quantity: productOrder.quantity,
      })),
      customerId: order.customer.id,
    });
  }

  getTotalDue(products: ProductOrder[]): number {
    return products
      .map(
        (productOrder) =>
          (productOrder.product as Product).price * productOrder.quantity,
      )
      .reduce((previous, acc) => previous + acc, 0);
  }

  updateCurrentOrder(data: Partial<Order>): void {
    this.currentOrder.next({
      ...this.currentOrder.value,
      ...data,
    });
  }

  addProductToCurrentOrder(product: ProductOrder): void {
    const products = [...this.currentOrder.value.products, product];
    this.updateCurrentOrder({
      products,
      totalDue: this.getTotalDue(products),
    });
  }

  removeProductFromCurrentOrder(productId: string): void {
    const products = this.currentOrder.value.products.filter(
      (productOrder) => (productOrder.product as Product).id !== productId,
    );

    this.updateCurrentOrder({
      products,
      totalDue: this.getTotalDue(products),
    });
  }

  resetOrder(): void {
    this.currentOrder.next({
      ...this.emptyOrder,
    });
  }
}

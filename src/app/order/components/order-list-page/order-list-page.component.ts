import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';
import Order from 'src/app/shared/interfaces/order.interface';
import { QueryService } from 'src/app/shared/services/query.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list-page',
  templateUrl: './order-list-page.component.html',
  styleUrls: ['./order-list-page.component.scss'],
})
export class OrderListPageComponent implements OnInit {
  public orderStatusValues = [
    { label: 'Processing', value: OrderStatus.PROCESSING },
    { label: 'Delivering', value: OrderStatus.DELIVERING },
    { label: 'Delivered', value: OrderStatus.DELIVERED },
  ];

  public orders$: Observable<Order[]>;

  constructor(
    private orderService: OrderService,
    private queryService: QueryService,
  ) {}

  ngOnInit(): void {
    this.orders$ = this.queryService.buildQueryObservable((params) =>
      this.orderService.getOrdersByQueryParams(params),
    );
  }

  onOrderStatusSelectionChanged(event: MatSelectChange): void {
    this.queryService.updateCurrentQuery({
      status: event.value,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { tableRowExpand } from 'src/app/shared/animations/table-row-expand.animation';
import { BaseDirective } from 'src/app/shared/base/base.directive';
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';
import Order from 'src/app/shared/interfaces/order.interface';
import { QueryService } from 'src/app/shared/services/query.service';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-list-page',
  templateUrl: './order-list-page.component.html',
  styleUrls: ['./order-list-page.component.scss'],
  animations: [tableRowExpand],
})
export class OrderListPageComponent extends BaseDirective implements OnInit {
  public displayedColumns = [
    'customerName',
    'status',
    'totalDue',
    'paymentMethod',
    'placedAt',
    'updatedAt',
  ];

  public orderStatusValues = [
    { label: 'Processing', value: OrderStatus.PROCESSING },
    { label: 'Delivering', value: OrderStatus.DELIVERING },
    { label: 'Delivered', value: OrderStatus.DELIVERED },
  ];

  public orders$: Observable<Order[]>;
  public statusControl: FormControl;
  public expandedRow = null;

  constructor(
    private orderService: OrderService,
    private queryService: QueryService,
  ) {
    super();
    this.statusControl = new FormControl({});
  }

  ngOnInit(): void {
    this.managedSubscriptions.push(
      this.statusControl.valueChanges
        .pipe(
          distinctUntilChanged(),
          tap((value) => this.onOrderStatusSelectionChanged(value)),
        )
        .subscribe(),
    );

    this.orders$ = this.queryService.buildQueryObservable((params) => {
      this.statusControl.setValue(params.status);
      return this.orderService.getOrdersByQueryParams(params);
    });
  }

  onOrderStatusSelectionChanged(status: OrderStatus): void {
    this.queryService.updateCurrentQuery({
      status,
    });
  }
}

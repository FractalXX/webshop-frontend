import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BaseDirective } from 'src/app/shared/base/base.directive';
import Order from 'src/app/shared/interfaces/order.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-details-page',
  templateUrl: './order-details-page.component.html',
})
export class OrderDetailsPageComponent extends BaseDirective implements OnInit {
  public order$: Observable<Order>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.order$ = this.route.params.pipe(
      switchMap((params) => this.orderService.getOrderById(params.id)),
    );
  }
}

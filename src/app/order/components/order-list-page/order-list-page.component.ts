import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list-page',
  templateUrl: './order-list-page.component.html',
  styleUrls: ['./order-list-page.component.scss'],
})
export class OrderListPageComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}
}

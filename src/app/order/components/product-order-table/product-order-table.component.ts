import { Component, Input, OnInit } from '@angular/core';
import ProductOrder from 'src/app/shared/interfaces/product-order.interface';

@Component({
  selector: 'app-product-order-table',
  templateUrl: './product-order-table.component.html',
  styleUrls: ['./product-order-table.component.scss'],
})
export class ProductOrderTableComponent implements OnInit {
  @Input() productOrders: ProductOrder[];
  @Input() totalDue: number;

  public productTableColumns = ['name', 'price', 'quantity'];

  constructor() {}

  ngOnInit(): void {}
}

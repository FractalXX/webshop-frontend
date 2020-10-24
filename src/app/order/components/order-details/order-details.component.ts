import { Component, Input } from '@angular/core';
import Order from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  @Input() order: Order;

  public productTableColumns = ['name', 'price', 'quantity'];
}

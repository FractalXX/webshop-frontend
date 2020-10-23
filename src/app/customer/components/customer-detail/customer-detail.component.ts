import { Component, Input } from '@angular/core';
import Customer from 'src/app/shared/interfaces/customer.interface';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent {
  @Input() customer: Customer;
}

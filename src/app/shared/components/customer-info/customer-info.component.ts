import { Component, Input } from '@angular/core';
import CustomerInfo from '../../interfaces/customer-info.interface';

@Component({
  selector: 'app-customer-info',
  template: `
    <dl>
      <dt>Name:</dt>
      <dd>{{ customerInfo.name }}</dd>

      <dt>Address:</dt>
      <dd>
        <app-simple-address [address]="customerInfo"></app-simple-address>
      </dd>
    </dl>
  `,
})
export class CustomerInfoComponent {
  @Input() customerInfo: CustomerInfo;
}

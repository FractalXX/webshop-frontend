import { Component, Input, OnInit } from '@angular/core';
import Address from '../../interfaces/address.interface';

@Component({
  selector: 'app-simple-address',
  template: `
    <p>
      <span>{{ address.address }}</span>
      <span>{{ address.city }} {{ address.zipCode }}</span>
      <span>{{ address.country }}</span>
    </p>
  `,
  styles: [
    `
      span {
        display: block;
      }
    `,
  ],
})
export class SimpleAddressComponent {
  @Input() address: Address;
}

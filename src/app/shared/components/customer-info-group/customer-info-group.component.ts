import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-info-group',
  templateUrl: './customer-info-group.component.html',
})
export class CustomerInfoGroupComponent {
  @Input() formGroup: FormGroup;
  @Input() layout = 'row wrap';
  @Input() layoutGap = '16px';
  @Input() required = true;
}

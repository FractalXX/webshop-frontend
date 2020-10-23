import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-info-group',
  templateUrl: './customer-info-group.component.html',
})
export class CustomerInfoGroupComponent implements OnChanges {
  @Input() formGroup: FormGroup;
  @Input() layout = 'row wrap';
  @Input() layoutGap = '16px';
  @Input() required = true;
  @Input() disabled = false;

  ngOnChanges(changes: SimpleChanges): void {
    if ('disabled' in changes) {
      const disabled = changes.disabled.currentValue;

      if (disabled) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
    }
  }
}

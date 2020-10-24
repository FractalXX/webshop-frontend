import { Directive, Host, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseDirective } from '../base/base.directive';

@Directive({
  selector: '[appMax]',
})
export class MaxDirective extends BaseDirective {
  @Input('appMax') max: number;

  constructor(@Host() ngControl: NgControl) {
    super();
    if (!ngControl) {
      throw Error('appMax directive must be used on a control');
    }

    this.managedSubscriptions.push(
      ngControl.valueChanges.subscribe((value) => {
        if (value && value > this.max) {
          ngControl.control.setValue(this.max);
        }
      }),
    );
  }
}

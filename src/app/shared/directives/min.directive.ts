import { Directive, Host, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseDirective } from '../base/base.directive';

@Directive({
  selector: '[appMin]',
})
export class MinDirective extends BaseDirective {
  @Input('appMin') min: number;

  constructor(@Host() ngControl: NgControl) {
    super();
    if (!ngControl) {
      throw Error('appMin directive must be used on a control');
    }

    this.managedSubscriptions.push(
      ngControl.valueChanges.subscribe((value) => {
        if (value && value < this.min) {
          ngControl.control.setValue(this.min);
        }
      }),
    );
  }
}

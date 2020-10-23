import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { keys } from 'lodash-es';
import { distinctUntilChanged } from 'rxjs/operators';
import { BaseDirective } from '../../base/base.directive';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleInputComponent
  extends BaseDirective
  implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() hint: string;
  @Input() type: 'password' | 'number' | 'text' | 'email' = 'text';
  @Input() required = false;

  public internalControl = new FormControl();

  public trackByIdentity = (index: number, item: any) => item;
  public onTouched = () => {};
  public onChange = (value: any) => {};

  constructor(private control: NgControl) {
    super();
    this.control.valueAccessor = this;
  }

  ngOnInit(): void {
    this.managedSubscriptions.push(
      this.control.statusChanges.subscribe(() =>
        this.internalControl.setErrors(this.control.errors),
      ),

      this.internalControl.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((value) => this.onChange(value)),
    );
  }

  writeValue(obj: any): void {
    this.internalControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.internalControl.disable();
    } else {
      this.internalControl.enable();
    }
  }

  getFirstError(): string {
    return keys(this.control.errors)[0];
  }
}

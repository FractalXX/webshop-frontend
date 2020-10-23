import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BaseDirective } from 'src/app/shared/base/base.directive';
import { PaymentMethod } from 'src/app/shared/enums/payment-method.enum';
import Order from 'src/app/shared/interfaces/order.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-place-page',
  templateUrl: './order-place-page.component.html',
  styleUrls: ['./order-place-page.component.scss'],
})
export class OrderPlacePageComponent extends BaseDirective implements OnInit {
  public readonly maxDate = new Date();

  public personalInfoGroup: FormGroup;
  public shippingGroup: FormGroup;
  public currentOrder$: Observable<Order>;

  public paymentMethodValues = [
    { label: 'Cash', value: PaymentMethod.CASH },
    { label: 'Bank transfer', value: PaymentMethod.BANK_TRANSFER },
  ];

  constructor(formBuilder: FormBuilder, private orderService: OrderService) {
    super();
    this.personalInfoGroup = formBuilder.group({
      name: [''],
      email: [''],
      birthDate: [''],
    });

    this.shippingGroup = formBuilder.group({
      shippingInfo: this.createAddressGroup(formBuilder),
      billingInfo: this.createAddressGroup(formBuilder),
      paymentMethod: [''],
    });

    this.currentOrder$ = this.orderService.currentOrder$;

    this.managedSubscriptions.push(
      combineLatest([
        this.shippingGroup.valueChanges.pipe(startWith({})),
        this.personalInfoGroup.valueChanges.pipe(startWith({})),
      ])
        .pipe(
          map((result) => ({
            personalInfoGroup: result[0],
            shippingGroup: result[1],
          })),
        )
        .subscribe((data) => {
          this.orderService.updateCurrentOrder({
            customer: { ...data.personalInfoGroup },
            ...data.shippingGroup,
          });
        }),
    );
  }

  ngOnInit(): void {}

  private createAddressGroup(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      name: [''],
      country: [''],
      city: [''],
      zipCode: [''],
      address: [''],
    });
  }
}

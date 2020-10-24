import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { BaseDirective } from 'src/app/shared/base/base.directive';
import { PaymentMethod } from 'src/app/shared/enums/payment-method.enum';
import OrderCreate from 'src/app/shared/interfaces/order-create.interface';
import Order from 'src/app/shared/interfaces/order.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-place-page',
  templateUrl: './order-place-page.component.html',
  styleUrls: ['./order-place-page.component.scss'],
})
export class OrderPlacePageComponent extends BaseDirective implements OnInit {
  public readonly maxDate = new Date();

  public personalInfoGroup: FormGroup;
  public shippingGroup: FormGroup;
  public currentOrder$: Observable<OrderCreate>;
  public matchIndicator = false;

  public paymentMethodValues = [
    { label: 'Cash', value: PaymentMethod.CASH },
    { label: 'Bank transfer', value: PaymentMethod.BANK_TRANSFER },
  ];

  constructor(
    formBuilder: FormBuilder,
    private orderService: OrderService,
    private customerService: CustomerService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
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
        this.personalInfoGroup.valueChanges.pipe(startWith({})),
        this.shippingGroup.valueChanges.pipe(startWith({})),
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

  placeOrder(): void {
    const { billingInfo, shippingInfo } = this.shippingGroup.value;

    this.customerService
      .createCustomer({
        ...this.personalInfoGroup.value,
        billingInfo,
        shippingInfos: this.matchIndicator ? [billingInfo] : [shippingInfo],
      })
      .pipe(
        tap((customer) => this.orderService.updateCurrentOrder({ customer })),
        switchMap(() => this.orderService.currentOrder$),
        switchMap((order) => this.orderService.createOrder(order)),
      )
      .subscribe(() => {
        this.notificationService.notify('Order successfully created.');
        this.router.navigateByUrl('/orders');
      });
  }
}

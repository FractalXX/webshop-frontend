import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { first, map, startWith, switchMap, tap } from 'rxjs/operators';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { BaseDirective } from 'src/app/shared/base/base.directive';
import { PaymentMethod } from 'src/app/shared/enums/payment-method.enum';
import OrderCreate from 'src/app/shared/interfaces/order-create.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { noWhitespaceOnlyPattern } from 'src/app/shared/utils/patterns';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-place-page',
  templateUrl: './order-place-page.component.html',
  styleUrls: ['./order-place-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPlacePageComponent extends BaseDirective {
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
      name: ['', [Validators.pattern(noWhitespaceOnlyPattern)]],
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
          const {
            billingInfo,
            shippingInfo,
            paymentMethod,
          } = data.shippingGroup;
          this.orderService.updateCurrentOrder({
            customer: { ...data.personalInfoGroup },
            paymentMethod,
            billingInfo,
            shippingInfo: this.matchIndicator ? billingInfo : shippingInfo,
          });
        }),
    );
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
        switchMap(() => this.orderService.currentOrder$.pipe(first())),
        switchMap((order) => this.orderService.createOrder(order)),
      )
      .subscribe(() => {
        this.notificationService.notify('Order successfully created.');
        this.router.navigateByUrl('/orders');
        this.orderService.resetOrder();
      });
  }

  onMatchIndicatorUpdate(value: boolean): void {
    this.matchIndicator = value;
    if (!value) {
      this.orderService.updateCurrentOrder({
        shippingInfo: null,
      });
    } else {
      this.shippingGroup.get('shippingInfo').reset();
    }
  }

  private createAddressGroup(formBuilder: FormBuilder): FormGroup {
    const plainTextControl = [
      '',
      [Validators.pattern(noWhitespaceOnlyPattern)],
    ];
    return formBuilder.group({
      name: plainTextControl,
      country: plainTextControl,
      city: plainTextControl,
      zipCode: plainTextControl,
      address: plainTextControl,
    });
  }
}

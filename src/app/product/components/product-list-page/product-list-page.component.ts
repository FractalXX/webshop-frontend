import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ProductOrder from 'src/app/shared/interfaces/product-order.interface';
import Product from 'src/app/shared/interfaces/product.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { QueryService } from 'src/app/shared/services/query.service';
import { ProductService } from '../../services/product.service';
import { ProductAddDialogComponent } from '../product-add-dialog/product-add-dialog.component';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
})
export class ProductListPageComponent implements OnInit {
  // Form will be template driven since it's easier to handle disabled states on the template this way
  @ViewChild('filterForm') filterForm: NgForm;

  public filterFormModel = {
    quantityFrom: null,
    quantityTo: null,
  };

  public createOrderEnabled$: Observable<boolean>;
  public products$: Observable<Product[]>;

  public productsInOrder$: Observable<string[]>;

  constructor(
    private queryService: QueryService,
    private productService: ProductService,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private matDialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.products$ = this.queryService.buildQueryObservable((params) => {
      this.filterFormModel = { ...params };
      this.cdr.detectChanges();
      return this.productService.getProducts(params);
    });

    this.createOrderEnabled$ = this.orderService.currentOrder$.pipe(
      map((order) => !!order.products.length),
    );

    this.productsInOrder$ = this.orderService.currentOrder$.pipe(
      map((order) =>
        order.products.map(
          (productOrder) => (productOrder.product as Product).id,
        ),
      ),
    );
  }

  onOutOfStockIndicatorChanged(event: MatCheckboxChange): void {
    if (event.checked) {
      this.filterForm.reset({
        quantityFrom: 0,
        quantityTo: 0,
      });
    } else {
      this.filterForm.reset();
    }
  }

  updateQuery(): void {
    this.queryService.updateCurrentQuery(this.filterFormModel);
  }

  openProductAddDialog(product: Product): void {
    this.matDialog
      .open(ProductAddDialogComponent, {
        data: product.quantity,
      })
      .afterClosed()
      .subscribe((quantity) => {
        if (quantity) {
          this.updateProductOrder(product, true, quantity);
        }
      });
  }

  updateProductOrder(
    product: Product,
    add: boolean = false,
    quantity?: number,
  ): void {
    if (add) {
      this.orderService.addProductToCurrentOrder({
        product,
        quantity,
      });
      this.notificationService.notify(
        `Added ${quantity} ${product.name} to the current order`,
      );
    } else {
      this.orderService.removeProductFromCurrentOrder(product.id);
      this.notificationService.notify(
        `Removed ${product.name} from the current order`,
      );
    }
  }
}

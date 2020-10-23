import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Product from 'src/app/shared/interfaces/product.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { QueryService } from 'src/app/shared/services/query.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
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

  constructor(
    private queryService: QueryService,
    private productService: ProductService,
    private orderService: OrderService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.products$ = this.queryService.buildQueryObservable((params) =>
      this.productService.getProducts(params),
    );

    this.createOrderEnabled$ = this.orderService.currentOrder$.pipe(
      map((order) => !!order.products.length),
    );
  }

  onOutOfStockIndicatorChanged(event: MatCheckboxChange): void {
    if (event.checked) {
      this.filterForm.reset({
        quantityFrom: 0,
        quantityTo: 0,
      });
    }
  }

  updateQuery(): void {
    this.queryService.updateCurrentQuery(this.filterFormModel);
  }

  updateProductOrder(product: Product, add: boolean): void {
    if (add) {
      this.orderService.addProductToCurrentOrder({
        product,
        quantity: 1,
      });
      this.notificationService.notify(
        `Added 1 ${product.name} to the current order`,
      );
    } else {
      this.orderService.removeProductFromCurrentOrder(product.id);
      this.notificationService.notify(
        `Removed ${product.name} from the current order`,
      );
    }
  }
}

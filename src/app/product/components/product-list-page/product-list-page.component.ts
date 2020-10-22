import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import Product from 'src/app/shared/interfaces/product.interface';
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

  public products$: Observable<Product[]>;

  constructor(
    private queryService: QueryService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.products$ = this.queryService.buildQueryObservable((params) =>
      this.productService.getProducts(params),
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
}

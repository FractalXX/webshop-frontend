import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import Product from 'src/app/shared/interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  public filterFormGroup: FormGroup;
  public products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    formBuilder: FormBuilder,
  ) {
    this.filterFormGroup = formBuilder.group({
      quantityFrom: [''],
      quantityTo: [''],
    });
  }

  ngOnInit(): void {
    this.products$ = this.route.queryParams.pipe(
      distinctUntilChanged(),
      switchMap((queryParams) => this.productService.getProducts(queryParams)),
    );
  }

  updateQuery(): void {}
}

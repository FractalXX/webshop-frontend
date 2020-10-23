import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Product from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Output() orderCheckChanged = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}
}

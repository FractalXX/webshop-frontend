import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductAddDialogComponent } from './components/product-add-dialog/product-add-dialog.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductListPageComponent,
    ProductAddDialogComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, SharedModule],
})
export class ProductModule {}

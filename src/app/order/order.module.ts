import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderDetailsPageComponent } from './components/order-details-page/order-details-page.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderListPageComponent } from './components/order-list-page/order-list-page.component';
import { OrderPlacePageComponent } from './components/order-place-page/order-place-page.component';
import { ProductOrderTableComponent } from './components/product-order-table/product-order-table.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [
    OrderListPageComponent,
    OrderDetailsComponent,
    OrderPlacePageComponent,
    ProductOrderTableComponent,
    OrderDetailsPageComponent,
  ],
  imports: [CommonModule, OrderRoutingModule, SharedModule],
})
export class OrderModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderListPageComponent } from './components/order-list-page/order-list-page.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [OrderListPageComponent],
  imports: [CommonModule, OrderRoutingModule, SharedModule],
})
export class OrderModule {}

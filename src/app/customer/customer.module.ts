import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CustomerDetailsPageComponent } from './components/customer-details-page/customer-details-page.component';
import { CustomerListPageComponent } from './components/customer-list-page/customer-list-page.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [CustomerListPageComponent, CustomerDetailsPageComponent],
  imports: [CommonModule, CustomerRoutingModule, SharedModule],
})
export class CustomerModule {}

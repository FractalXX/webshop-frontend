import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailsPageComponent } from './components/customer-details-page/customer-details-page.component';
import { CustomerListPageComponent } from './components/customer-list-page/customer-list-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: CustomerDetailsPageComponent,
  },
  {
    path: '',
    component: CustomerListPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}

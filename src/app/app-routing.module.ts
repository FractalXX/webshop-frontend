import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListPageComponent } from './customer/components/customer-list-page/customer-list-page.component';
import { ProductListPageComponent } from './product/components/product-list-page/product-list-page.component';

const routes: Routes = [
  {
    path: 'products',
    // TODO configure module routing and lazy loading
    component: ProductListPageComponent,
  },
  {
    path: 'customers',
    component: CustomerListPageComponent,
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

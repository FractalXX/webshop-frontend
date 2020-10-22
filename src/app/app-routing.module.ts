import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteNames } from './app-route-names.enum';

const routes: Routes = [
  {
    path: AppRouteNames.PRODUCTS,
    loadChildren: () =>
      import('./product/product.module').then((module) => module.ProductModule),
  },
  {
    path: AppRouteNames.CUSTOMERS,
    loadChildren: () =>
      import('./customer/customer.module').then(
        (module) => module.CustomerModule,
      ),
  },
  {
    path: AppRouteNames.ORDERS,
    loadChildren: () =>
      import('./order/order.module').then((module) => module.OrderModule),
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

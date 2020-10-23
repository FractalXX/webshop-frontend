import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListPageComponent } from './components/order-list-page/order-list-page.component';
import { OrderPlacePageComponent } from './components/order-place-page/order-place-page.component';

const routes: Routes = [
  {
    path: 'create',
    component: OrderPlacePageComponent,
  },
  {
    path: '',
    component: OrderListPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}

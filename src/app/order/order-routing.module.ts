import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListPageComponent } from './components/order-list-page/order-list-page.component';

const routes: Routes = [
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

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppRouteNames } from 'src/app/app-route-names.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  public readonly menuItems = [
    {
      name: 'Products',
      link: `/${AppRouteNames.PRODUCTS}`,
    },
    {
      name: 'Customers',
      link: `/${AppRouteNames.CUSTOMERS}`,
    },
    {
      name: 'Orders',
      link: `/${AppRouteNames.ORDERS}`,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

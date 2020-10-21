import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public readonly menuItems = [
    {
      name: 'Products',
      link: '/products',
    },
    {
      name: 'Customers',
      link: '/customers',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

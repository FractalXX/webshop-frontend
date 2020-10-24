import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Customer from 'src/app/shared/interfaces/customer.interface';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss'],
})
export class CustomerListPageComponent implements OnInit {
  public displayedColumns = ['name', 'email', 'birthDate'];

  public customers$: Observable<Customer[]>;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customers$ = this.customerService.getAllCustomers();
  }
}

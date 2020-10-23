import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tableRowExpand } from 'src/app/shared/animations/table-row-expand.animation';
import Customer from 'src/app/shared/interfaces/customer.interface';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss'],
  animations: [tableRowExpand],
})
export class CustomerListPageComponent implements OnInit {
  public displayedColumns = ['name', 'email', 'birthDate'];

  public customers$: Observable<Customer[]>;
  public expandedRow = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customers$ = this.customerService.getAllCustomers();
  }
}

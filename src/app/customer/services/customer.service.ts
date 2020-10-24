import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Customer from 'src/app/shared/interfaces/customer.interface';
import { ApiHttpClient } from 'src/app/shared/utils/api-http-client';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: ApiHttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get('/customers');
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post('/customers', customer);
  }
}

import { PaymentMethod } from '../enums/payment-method.enum';
import Customer from './customer.interface';
import ProductOrder from './product-order.interface';

export default interface OrderCreate {
  customer: Customer;
  products: ProductOrder[];
  paymentMethod: PaymentMethod;
}

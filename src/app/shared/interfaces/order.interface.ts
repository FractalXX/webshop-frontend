import { OrderStatus } from '../enums/order-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
import ProductOrder from './product-order.interface';

export default interface Order {
  // FIXME: union type won't work on the template
  customer: any;
  products: ProductOrder[];
  placedAt: Date;
  updatedAt?: Date;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  totalDue?: number;
}

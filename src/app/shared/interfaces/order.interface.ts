import { OrderStatus } from '../enums/order-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';

export default interface Order {
  customerId: string;
  placedAt: Date;
  updatedAt?: Date;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
}

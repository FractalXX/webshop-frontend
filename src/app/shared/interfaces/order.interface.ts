import { OrderStatus } from '../enums/order-status.enum';
import CustomerInfo from './customer-info.interface';
import OrderCreate from './order-create.interface';

export default interface Order extends OrderCreate {
  shippingInfo: CustomerInfo;
  billingInfo: CustomerInfo;
  placedAt: Date;
  updatedAt: Date;
  status: OrderStatus;
  totalDue: number;
}

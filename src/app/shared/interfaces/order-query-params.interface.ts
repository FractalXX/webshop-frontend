import { OrderStatus } from '../enums/order-status.enum';

export interface OrderQueryParams {
  status?: OrderStatus;
}

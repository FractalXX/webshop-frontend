import { CustomerInfoType } from '../enums/customer-info-type.enum';
import Address from './address.interface';

export default interface CustomerInfo extends Address {
  id: string;
  type: CustomerInfoType;
  name: string;
}

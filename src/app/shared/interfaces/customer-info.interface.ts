import { CustomerInfoType } from '../enums/customer-info-type.enum';

export default interface CustomerInfo {
  id: string;
  type: CustomerInfoType;
  name: string;
  country: string;
  city: string;
  zipCode: string;
  address: string;
}

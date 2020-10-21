import CustomerInfo from './customer-info.interface';

export default interface Customer {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
  shippingInfos: CustomerInfo[];
  billingInfo: CustomerInfo;
}

import Product from './product.interface';

export default interface ProductOrder {
  product: string | Product;
  quantity: number;
}

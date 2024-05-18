export interface Cancellation {
  id_product_fk: number;
  count: number;
  product: {
    name: string;
  };
}

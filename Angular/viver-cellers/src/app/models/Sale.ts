export interface Sale {
  id_product_fk: number;
  count: number;
  product: {
    name: string;
  };
}

export interface Product {
  id: number;
  id_vineyard_area_fk: number;
  name: string;
  winemaking: string;
  grade_alcohol: number;
  stock: number;
  price: number;
  iva: number;
  id_type_wine_fk: number | null;
  id_type_variety_fk: number | null;
  project_id: number | null;
  quantity: number;
  created_at: string;
  updated_at: string;
}

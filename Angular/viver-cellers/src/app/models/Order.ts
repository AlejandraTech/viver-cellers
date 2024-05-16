import { OrderDetail } from "./OrderDetails";

export interface Order {
  id: number;
  user_name: string;
  address: string;
  price: number;
  status: string;
  order_details: OrderDetail[];
}

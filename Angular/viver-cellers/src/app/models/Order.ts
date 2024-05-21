// Import the OrderDetail interface from the OrderDetails file
import { OrderDetail } from "./OrderDetails";

export interface Order {
  id: number; // Unique identifier of the order
  user_name: string; // Name of the user who placed the order
  address: string; // Order shipping address
  price: number; // Total price of the order
  status: string; // Current status of the order.
  order_details: OrderDetail[]; // Order details, which can include multiple items.
}

// src/types/OrderSummary.ts
import { CartItem } from './CartItem';

// Define la estructura para la información del usuario en el resumen
interface OrderUserSummary {
  email?: string; 
  firstName?: string;
  lastName?: string;
  role?: string;
  
}

// Define la estructura para la dirección de envío en el resumen
interface OrderShippingAddress {
  street: string;
  department?: string; 
  regionId: string; 
  comunaId: string;
  indications?: string;
}

// Define la estructura para la info de pago 
interface OrderPaymentInfo {
    cardNumberLast4: string; 
}

export interface OrderSummary {
  user: OrderUserSummary | null; 
  shippingAddress: OrderShippingAddress;
  paymentInfo: OrderPaymentInfo;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  orderDate: string; 
  orderId: string; 
}
interface OrderSummaryItem { 
  id: string;
  name: string;
  price: number; 
  img: string; 
  cantidad: number;
}
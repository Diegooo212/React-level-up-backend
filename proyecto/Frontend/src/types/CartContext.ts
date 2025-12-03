// src/types/CartContext.ts
import { CartItem } from './CartItem';
import { Product } from './Product';

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string | number) => void;
  changeQuantity: (itemId: string | number, delta: number) => void;
  getCartTotalQuantity: () => number;
  clearCart: () => void; 

  
}
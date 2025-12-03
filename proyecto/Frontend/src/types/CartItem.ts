// src/types/CartItem.ts
import { Product } from './Product';

export interface CartItem {
  id: string | number;
  name: string;
  brand: string;
  price: number; 
  img: string;
  cantidad: number;
  stock: number; 
}
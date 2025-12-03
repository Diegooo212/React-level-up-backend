// src/types/Product.ts
export interface Product {
  id: string | number;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  discountPrice?: number;
  onSale?: boolean;
  stock: number;
  img: string;
}
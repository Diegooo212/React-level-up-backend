// src/types/Order.ts

// 1. Definimos los posibles estados de una orden
export type OrderStatus = 'Procesando' | 'Enviado' | 'Entregado' | 'Cancelado';

// 2. Definimos la estructura de la Orden
export interface Order {
  id: string;
  customerName: string; 
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  
}
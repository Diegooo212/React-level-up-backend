// src/data/orders.ts

// Importamos los tipos que definimos
import { Order, OrderStatus } from '../types/Order';

export const orders: Order[] = [
  { 
    id: 'ORD-1001', 
    customerName: 'Admin (Diego)', 
    customerEmail: 'admin@levelup.cl', 
    date: '2025-10-30', 
    total: 149.99, 
    status: 'Entregado' 
  },
  { 
    id: 'ORD-1002', 
    customerName: 'Juan Pérez', 
    customerEmail: 'juan.perez@gmail.com', 
    date: '2025-10-29', 
    total: 89.50, 
    status: 'Enviado' 
  },
  { 
    id: 'ORD-1003', 
    customerName: 'Diego Dev', 
    customerEmail: 'diego.dev@aol.com', 
    date: '2025-10-28', 
    total: 240.00, 
    status: 'Procesando' 
  },
  { 
    id: 'ORD-1004', 
    customerName: 'Test User', 
    customerEmail: 'test.user@hotmail.com', 
    date: '2025-10-27', 
    total: 45.00, 
    status: 'Entregado' 
  },
  { 
    id: 'ORD-1005', 
    customerName: 'Carla Gomez', 
    customerEmail: 'carla.gomez@yahoo.com', 
    date: '2025-10-26', 
    total: 320.00, 
    status: 'Cancelado' 
  },
];
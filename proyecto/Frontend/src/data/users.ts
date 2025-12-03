// src/data/users.ts

import { AdminUser } from '../types/AdminUser';

export const users: AdminUser[] = [
  { 
    id: 'u001', 
    firstName: 'Diego', 
    lastName: 'Admin', 
    email: 'admin@levelup.cl', 
    role: 'admin', 
    dateJoined: '2024-01-15', 
    status: 'Activo' 
  },
  { 
    id: 'u002', 
    firstName: 'Juan', 
    lastName: 'Pérez', 
    email: 'juan.perez@gmail.com', 
    role: 'user', 
    dateJoined: '2025-05-20', 
    status: 'Activo' 
  },
  { 
    id: 'u003', 
    firstName: 'Carla', 
    lastName: 'Gomez', 
    email: 'carla.gomez@yahoo.com', 
    role: 'user', 
    dateJoined: '2025-08-10', 
    status: 'Activo' 
  },
  { 
    id: 'u004', 
    firstName: 'Test', 
    lastName: 'User', 
    email: 'test.user@hotmail.com', 
    role: 'user', 
    dateJoined: '2025-10-01', 
    status: 'Suspendido' 
  },
];
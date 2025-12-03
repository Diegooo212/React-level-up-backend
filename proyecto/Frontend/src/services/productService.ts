import axios from 'axios';
import { Product } from '../types/Product';

// La URL de tu Backend (Asegúrate de que el puerto coincida, 8080 u 8081)
const API_URL = 'http://localhost:8081/api/products';

export const productService = {
  
  // Obtener todos
  getAll: async (): Promise<Product[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Crear
  create: async (product: Product): Promise<Product> => {
    const response = await axios.post(API_URL, product);
    return response.data;
  },

  // Actualizar
  update: async (product: Product): Promise<Product> => {
    // Asumiendo que el ID viaja en la URL: /api/products/123
    const response = await axios.put(`${API_URL}/${product.id}`, product);
    return response.data;
  },

  // Eliminar
  delete: async (id: string | number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
};
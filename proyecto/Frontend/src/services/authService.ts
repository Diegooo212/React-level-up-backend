import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';

// Tipos de datos para TypeScript
export interface LoginResponse {
  token: string;
  type: string;
  id: string;
  email: string;
  role: string;
}

export const authService = {
  
  // Función para Iniciar Sesión
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post(API_URL + '/login', {
      email,
      password
    });
    
    // Si hay token, lo guardamos en localStorage automáticamente aquí (o en el context)
    if (response.data.token) {
      localStorage.setItem('user_token', JSON.stringify(response.data));
    }
    
    return response.data;
  },

  // Función para Registrarse
  register: async (firstName: string, lastName: string, email: string, password: string) => {
    return axios.post(API_URL + '/register', {
      firstName,
      lastName,
      email,
      password,
      role: 'user' 
    });
  },

  // Función para Salir
  logout: () => {
    localStorage.removeItem('user_token');
  },

  // Helper para obtener el usuario actual guardado
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user_token');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
};
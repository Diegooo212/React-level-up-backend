import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { authService, LoginResponse } from '../services/authService';
import { User, AuthContextType, UserProfile } from '../types/AuthContextType';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Al cargar la app, buscamos si hay un usuario guardado
    const user = authService.getCurrentUser();
    
    if (user) {
      setCurrentUser(user);
      // Configurar Axios para que use el token en todas las peticiones futuras
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => { // Nota: Ya no pedimos 'role' aquí, viene del backend
    try {
      const data = await authService.login(email, password);
      
      // Actualizamos el estado
      setCurrentUser(data as unknown as User); // Casting simple para adaptar tipos
      
      // Configuramos el token para futuras peticiones
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
      
      alert(`Bienvenido ${data.email}!`);
      return true; // Éxito
    } catch (error) {
      console.error("Error de login:", error);
      alert("Credenciales incorrectas");
      return false; // Fallo
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    // Quitamos el token de axios
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = "/"; 
  };

  // Función dummy para cumplir con la interfaz (el backend no actualiza perfil aun)
  const updateUserProfile = (profile: UserProfile) => {
    console.log("Actualizar perfil no implementado en backend aún", profile);
  };

  const contextValue: AuthContextType = {
    currentUser,
    login,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
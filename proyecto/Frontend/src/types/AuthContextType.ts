// src/types/AuthContextType.ts

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  address?: string; // (Mantenemos este por compatibilidad si se usa en otro lado)
  phone?: string;
  
  // --- CAMPOS NUEVOS AÑADIDOS ---
  street?: string;
  department?: string;
  regionId?: string;
  comunaId?: string;
  indications?: string;
}

export interface User {
  email: string;
  role: string;
  profile?: UserProfile;
  token?: string;
  id?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  // Actualizamos el tipo de login para que coincida con el AuthContext real
  login: (email: string, password: string) => Promise<boolean>; 
  logout: () => void;
  updateUserProfile: (profile: UserProfile) => void;
}
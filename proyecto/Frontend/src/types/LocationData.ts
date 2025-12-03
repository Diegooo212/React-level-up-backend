// src/types/LocationData.ts
export interface Comuna {
  id: string; 
  name: string;
}

export interface Region {
  id: string; 
  name: string;
  comunas: Comuna[];
}
// src/types/MapEvent.ts
export interface MapEvent {
  id: string | number;
  name: string;
  place: string;
  date: string; 
  coords: [number, number]; 
}
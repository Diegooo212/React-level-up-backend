// src/data/regionsAndComunas.ts
import { Region } from '../types/LocationData';

export const regionsAndComunas: Region[] = [
  {
    id: 'biobio',
    name: 'Región del Biobío',
    comunas: [
      { id: 'concepcion', name: 'Concepción' },
      { id: 'talcahuano', name: 'Talcahuano' },
      { id: 'hualpen', name: 'Hualpén' },
      { id: 'san-pedro', name: 'San Pedro de la Paz' },
      { id: 'chiguayante', name: 'Chiguayante' },
    ],
  },
  {
    id: 'nuble',
    name: 'Región de Ñuble',
    comunas: [
      { id: 'chillan', name: 'Chillán' },
      { id: 'chillan-viejo', name: 'Chillán Viejo' },
      { id: 'bulnes', name: 'Bulnes' },
    ],
  },
  {
    id: 'metropolitana',
    name: 'Región Metropolitana de Santiago',
    comunas: [
        { id: 'santiago', name: 'Santiago Centro'},
        { id: 'providencia', name: 'Providencia'},
        { id: 'las-condes', name: 'Las Condes'},
    ]
  }
  
];
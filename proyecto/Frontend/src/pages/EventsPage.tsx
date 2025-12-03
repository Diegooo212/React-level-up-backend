// src/pages/EventsPage.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { events } from '../data/events';
import { LatLngExpression } from 'leaflet';


import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const EventsPage: React.FC = () => {
  const centerCoords: LatLngExpression = [-36.77, -72.75];
  const zoomLevel = 9; 
  return (
    <Container className="events-page-container my-5">
      <h1 className="text-center mb-4" style={{ color: '#66fcf1' }}>
        Próximos Eventos Gamer
      </h1>
      <p style={{ textAlign: 'center' }}>
        ¡Encuentra torneos, juntas y lanzamientos cerca de ti!
      </p>

      
      <div className="map-container">
        
        <MapContainer 
            center={centerCoords} 
            zoom={zoomLevel} 
            style={{ height: '100%', width: '100%' }}
        >
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Itera sobre los eventos y crea un Marcador (Marker) para cada uno */}
          {events.map(event => (
            <Marker key={event.id} position={event.coords as LatLngExpression}>
              {/* Contenido del popup al hacer clic */}
              <Popup>
                <h3>{event.name}</h3>
                <p>
                  <strong>Lugar:</strong> {event.place}<br />
                  <strong>Fecha:</strong> {event.date}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Container>
  );
};

export default EventsPage;
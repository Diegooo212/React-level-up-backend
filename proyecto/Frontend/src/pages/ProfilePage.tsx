// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card, Accordion, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { regionsAndComunas } from '../data/regionsAndComunas';
import { Comuna } from '../types/LocationData';
import { UserProfile } from '../types/AuthContextType';
import { OrderSummary } from '../types/OrderSummary';

const ProfilePage: React.FC = () => {
    const { currentUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    // --- ESTADOS PARA FORMULARIOS ---
    const [firstName, setFirstName] = useState(currentUser?.profile?.firstName || '');
    const [lastName, setLastName] = useState(currentUser?.profile?.lastName || '');
    const [street, setStreet] = useState(currentUser?.profile?.street || '');
    const [department, setDepartment] = useState(currentUser?.profile?.department || '');
    const [selectedRegionId, setSelectedRegionId] = useState(currentUser?.profile?.regionId || '');
    const [selectedComunaId, setSelectedComunaId] = useState(currentUser?.profile?.comunaId || '');
    const [availableComunas, setAvailableComunas] = useState<Comuna[]>([]);
    const [indications, setIndications] = useState(currentUser?.profile?.indications || '');
    
    // --- NUEVO ESTADO PARA EL HISTORIAL ---
    const [purchaseHistory, setPurchaseHistory] = useState<OrderSummary[]>([]);
    
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    // --- LÓGICA DE RUTA PROTEGIDA Y CARGA DE DATOS ---
    useEffect(() => {
        if (!currentUser) {
            alert("Debes iniciar sesión para ver tu perfil.");
            navigate('/login');
        } else {
            // Cargar historial de compras
            const historialKey = `historial_${currentUser.email}`;
            const historial = JSON.parse(localStorage.getItem(historialKey) || '[]');
            setPurchaseHistory(historial);

            // Cargar datos del perfil en el formulario (por si el currentUser se carga después)
            if (currentUser.profile) {
                const profile = currentUser.profile;
                setFirstName(profile.firstName || '');
                setLastName(profile.lastName || '');
                setStreet(profile.street || '');
                setDepartment(profile.department || '');
                setSelectedRegionId(profile.regionId || '');
                setIndications(profile.indications || '');
                // La comuna se carga en el siguiente useEffect
            }
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        if (selectedRegionId) {
            const region = regionsAndComunas.find(r => r.id === selectedRegionId);
            setAvailableComunas(region ? region.comunas : []);
            
            if (currentUser?.profile?.regionId === selectedRegionId) {
                setSelectedComunaId(currentUser.profile.comunaId || '');
            } else {
                setSelectedComunaId('');
            }
        } else {
            setAvailableComunas([]);
            setSelectedComunaId('');
        }
    }, [selectedRegionId, currentUser?.profile]); 

    // --- MANEJADOR PARA GUARDAR CAMBIOS ---
    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!firstName || !lastName || !street || !selectedRegionId || !selectedComunaId) {
            setError('Por favor, completa todos los campos obligatorios (Nombre, Apellido, Calle, Región, Comuna).');
            return;
        }

        const profileData: UserProfile = {
            firstName,
            lastName,
            street,
            department: department || undefined,
            regionId: selectedRegionId,
            comunaId: selectedComunaId,
            indications: indications || undefined,
        };

        try {
            updateUserProfile(profileData); 
            setSuccessMessage('¡Perfil actualizado con éxito!');
            window.scrollTo(0, 0);
        } catch (err) {
            setError('Hubo un error al guardar el perfil.');
        }
    };

    if (!currentUser) {
        return null; 
    }

    return (
        <Container className="profile-container my-5">
            <Card className="profile-card">
                <Card.Body>
                    <h1 className="profile-title">Mi Perfil</h1>

                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form onSubmit={handleSaveProfile}>
                        <h4 className="profile-section-title">Información de la Cuenta</h4>
                        <Form.Group className="mb-3" controlId="profileEmail">
                           <Form.Label className="profile-form-label">Correo Electrónico</Form.Label>
                           <Form.Control
                               type="email"
                               className="profile-form-control"
                               value={currentUser.email}
                               disabled
                           />
                        </Form.Group>

                        <h4 className="profile-section-title">Información Personal</h4>
                        <Row className="mb-3">
                           <Form.Group as={Col} controlId="profileFirstName">
                               <Form.Label className="profile-form-label">Nombre</Form.Label>
                               <Form.Control
                                   type="text"
                                   className="profile-form-control"
                                   value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}
                                   required
                               />
                           </Form.Group>
                           <Form.Group as={Col} controlId="profileLastName">
                               <Form.Label className="profile-form-label">Apellidos</Form.Label>
                               <Form.Control
                                   type="text"
                                   className="profile-form-control"
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                                   required
                               />
                           </Form.Group>
                        </Row>

                        <h4 className="profile-section-title mt-4">Dirección de Envío</h4>
                           <Form.Group className="mb-3" controlId="profileStreet">
                               <Form.Label className="profile-form-label">Calle y Número</Form.Label>
                               <Form.Control
                                   type="text"
                                   className="profile-form-control"
                                   value={street}
                                   onChange={(e) => setStreet(e.target.value)}
                                   required
                               />
                           </Form.Group>
                           <Form.Group className="mb-3" controlId="profileDepartment">
                               <Form.Label className="profile-form-label">Departamento (Opcional)</Form.Label>
                               <Form.Control
                                   type="text"
                                   className="profile-form-control"
                                   value={department}
                                   onChange={(e) => setDepartment(e.target.value)}
                               />
                           </Form.Group>
                           <Row className="mb-3">
                               <Form.Group as={Col} controlId="profileRegion">
                                   <Form.Label className="profile-form-label">Región</Form.Label>
                                   <Form.Select
                                       className="profile-form-select"
                                       value={selectedRegionId}
                                       onChange={(e) => setSelectedRegionId(e.target.value)}
                                       required
                                   >
                                       <option value="">Selecciona una Región...</option>
                                       {regionsAndComunas.map(region => (
                                           <option key={region.id} value={region.id}>{region.name}</option>
                                       ))}
                                   </Form.Select>
                               </Form.Group>
                               <Form.Group as={Col} controlId="profileComuna">
                                   <Form.Label className="profile-form-label">Comuna</Form.Label>
                                   <Form.Select
                                       className="profile-form-select"
                                       value={selectedComunaId}
                                       onChange={(e) => setSelectedComunaId(e.target.value)}
                                       required
                                       disabled={!selectedRegionId || availableComunas.length === 0}
                                   >
                                       <option value="">{selectedRegionId ? 'Selecciona una Comuna...' : '-- Primero elige Región --'}</option>
                                       {availableComunas.map(comuna => (
                                           <option key={comuna.id} value={comuna.id}>{comuna.name}</option>
                                       ))}
                                   </Form.Select>
                               </Form.Group>
                           </Row>
                           <Form.Group className="mb-3" controlId="profileIndications">
                               <Form.Label className="profile-form-label">Indicaciones (Opcional)</Form.Label>
                               <Form.Control
                                   as="textarea"
                                   rows={2}
                                   className="profile-form-control"
                                   placeholder="Ej: Entre calles, color del edificio, no tiene timbre..."
                                   value={indications}
                                   onChange={(e) => setIndications(e.target.value)}
                               />
                           </Form.Group>
                        
                        <hr style={{ borderColor: '#45a29e' }} className="my-4"/>
                        <Button variant="info" type="submit" size="lg" className="w-100 fw-bold mb-5">
                            Guardar Cambios de Perfil
                        </Button>
                    </Form>
                    
                    

                    {/* --- SECCIÓN: HISTORIAL DE COMPRAS --- */}
                    <h2 className="profile-section-title mt-5">Historial de Compras</h2>
                    {purchaseHistory.length === 0 ? (
                        <Alert variant="info">Aún no has realizado ninguna compra.</Alert>
                    ) : (
                        <Accordion defaultActiveKey="0" className="history-accordion">
                            {purchaseHistory.map((order, index) => (
                                <Accordion.Item eventKey={String(index)} key={order.orderId}>
                                    <Accordion.Header>
                                        <div className="d-flex justify-content-between w-100 pe-3 flex-wrap">
                                            <span className="me-3"><strong>Pedido:</strong> {order.orderId.substring(0, 18)}...</span>
                                            <span className="me-3"><strong>Fecha:</strong> {order.orderDate.split(',')[0]}</span> 
                                            <span style={{ color: '#00ffea' }}><strong>Total:</strong> ${order.total.toLocaleString('es-CL')}</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ListGroup variant="flush" className="history-item-list">
                                            {order.items.map(item => (
                                                <ListGroup.Item key={item.id} className="bg-transparent">
                                                    <img
                                                        src={item.img} 
                                                        alt={item.name}
                                                        className="history-item-image"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = 'https://placehold.co/60x60/1f2833/66fcf1?text=IMG'; 
                                                        }}
                                                    />
                                                    <div className="item-details">
                                                        <span className="item-name">{item.name} (x{item.cantidad})</span>
                                                        <span className="item-price">${(item.price * item.cantidad).toLocaleString('es-CL')}</span>
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                        <hr style={{ borderColor: '#45a29e' }}/>
                                        <div className="text-end">
                                            <p>Subtotal: ${order.subtotal.toLocaleString('es-CL')}</p>
                                            {order.discount > 0 && (
                                                <p style={{ color: '#00ffea' }}>Descuento: -${order.discount.toLocaleString('es-CL')}</p>
                                            )}
                                            <h5 style={{ color: '#66fcf1' }}>Total: ${order.total.toLocaleString('es-CL')}</h5>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;
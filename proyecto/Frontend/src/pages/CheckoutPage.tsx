// src/pages/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, ListGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { regionsAndComunas } from '../data/regionsAndComunas';
import { Comuna } from '../types/LocationData';
import { OrderSummary } from '../types/OrderSummary';
import { UserProfile } from '../types/AuthContextType';

const CheckoutPage: React.FC = () => {
    const { cartItems, clearCart, getCartTotalQuantity } = useCart();
    const { currentUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [street, setStreet] = useState('');
    const [department, setDepartment] = useState('');
    const [selectedRegionId, setSelectedRegionId] = useState('');
    const [selectedComunaId, setSelectedComunaId] = useState('');
    const [availableComunas, setAvailableComunas] = useState<Comuna[]>([]);
    const [indications, setIndications] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');

    // --- LÓGICA DE REDIRECCIÓN ---
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!currentUser && cartItems.length > 0) {
                alert("Debes iniciar sesión para proceder al pago.");
                navigate('/login');
            } else if (cartItems.length === 0 && currentUser) {
                alert("Tu carrito está vacío.");
                navigate('/');
            }
        }, 500); 
        return () => clearTimeout(timer); 
    }, [cartItems, currentUser, navigate]);


    // --- EFECTO PARA AUTO-RELLENAR DATOS DEL PERFIL ---
    useEffect(() => {
        if (currentUser?.email) {
            setEmail(currentUser.email);
        }
        if (currentUser?.profile) {
            const profile = currentUser.profile;
            console.log("Perfil encontrado, auto-rellenando formulario:", profile);
            
            setFirstName(profile.firstName || '');
            setLastName(profile.lastName || '');
            setStreet(profile.street || '');
            setDepartment(profile.department || '');
            setSelectedRegionId(profile.regionId || '');
            setTimeout(() => {
                setSelectedComunaId(profile.comunaId || '');
            }, 100); 
            setIndications(profile.indications || '');
        }
    }, [currentUser]); 

    
    useEffect(() => {
        if (selectedRegionId) {
            const region = regionsAndComunas.find(r => r.id === selectedRegionId);
            setAvailableComunas(region ? region.comunas : []);
            
        } else {
            setAvailableComunas([]);
            setSelectedComunaId('');
        }
    }, [selectedRegionId]);

    useEffect(() => {
        if (selectedRegionId) {
            const region = regionsAndComunas.find(r => r.id === selectedRegionId);
            setAvailableComunas(region ? region.comunas : []);
            setSelectedComunaId('');
        } else {
            setAvailableComunas([]);
            setSelectedComunaId('');
        }
    }, [selectedRegionId]);

    const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.cantidad) || 0), 0);
    const esAlumnoDuoc = currentUser?.email?.toLowerCase().endsWith('@duocuc.cl') ?? false;
    const descuento = esAlumnoDuoc ? subtotal * 0.15 : 0;
    const totalFinal = subtotal - descuento;
    const totalItems = getCartTotalQuantity();

    useEffect(() => {
        const requiredFieldsFilled =
            firstName && lastName && email && street && selectedRegionId && selectedComunaId &&
            cardNumber && cardExpiry && cardCvv;

        const isEmailValid = /\S+@\S+\.\S+/.test(email);
        const isCardValid = cardNumber.replace(/\s/g, '').length >= 13 && cardNumber.replace(/\s/g, '').length <= 19;
        const isExpiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry);
        const isCvvValid = cardCvv.length >= 3 && cardCvv.length <= 4;
        const isValid = !!requiredFieldsFilled && isEmailValid && isCardValid && isExpiryValid && isCvvValid && cartItems.length > 0;

        setIsFormValid(isValid);
    }, [firstName, lastName, email, street, selectedRegionId, selectedComunaId, cardNumber, cardExpiry, cardCvv, cartItems]);


    const handlePurchase = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isFormValid) {
            setError('Por favor, completa toda la información obligatoria correctamente.');
            window.scrollTo(0, document.body.scrollHeight);
            return;
        }

        const paymentSuccess = Math.random() > 0.1;

        if (paymentSuccess) {
            const profileData: UserProfile = {
                firstName: firstName,
                lastName: lastName,
                street: street,
                department: department || undefined, 
                regionId: selectedRegionId,
                comunaId: selectedComunaId,
                indications: indications || undefined, 
            };
            updateUserProfile(profileData); 

            const orderData: OrderSummary = {
                user: currentUser ? { email: currentUser.email, role: currentUser.role, firstName, lastName } : null,
                shippingAddress: { street, department, regionId: selectedRegionId, comunaId: selectedComunaId, indications },
                paymentInfo: { cardNumberLast4: cardNumber.replace(/\s/g, '').slice(-4) },
                items: cartItems,
                subtotal: subtotal,
                discount: Math.round(descuento),
                total: Math.round(totalFinal),
                orderDate: new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'}),
                orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            };

            console.log("Compra exitosa simulada. Perfil guardado. Redirigiendo...", orderData);


            if (currentUser?.email) {
                const historialKey = `historial_${currentUser.email}`;
                const historial = JSON.parse(localStorage.getItem(historialKey) || '[]');
                historial.unshift(orderData); 
                localStorage.setItem(historialKey, JSON.stringify(historial));
                console.log("Orden guardada en historial.");
            }
            
            clearCart();
            navigate('/confirmacion', { state: { orderData } });
        } else {
            setError('Hubo un problema con el pago. Por favor, verifica tus datos o intenta nuevamente.');
            console.error("Simulación de pago fallida.");
            window.scrollTo(0, document.body.scrollHeight);
        }
    };

     if (currentUser === undefined) { 
         return <Container className="text-center my-5"><p>Cargando...</p></Container>;
     }

     if (!currentUser || cartItems.length === 0) {
         return null; 
     }


    return (
        <Container className="checkout-container my-5">
            <h1 className="text-center mb-4" style={{ color: '#66fcf1' }}>Finalizar Compra</h1>
            <Row className="justify-content-center">
                <Col md={5} lg={4} className="order-md-last mb-4">
                    <div className="summary-card">
                        <h4 className="d-flex justify-content-between align-items-center mb-3 checkout-section-title">
                            <span>Tu Carrito</span>
                            <Badge pill bg="info">{totalItems}</Badge>
                        </h4>
                        <ListGroup variant="flush">
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.id} className="summary-item bg-transparent px-0" style={{ color: '#00ffea' }}>
                                    <div className="summary-item-name">
                                        <h6 className="my-0">{item.name}</h6>
                                        <small className="text-muted">Cantidad: {item.cantidad}</small>
                                    </div>
                                    <span className="summary-item-price">
                                        ${((Number(item.price) || 0) * (Number(item.cantidad) || 0)).toLocaleString('es-CL')}
                                    </span>
                                </ListGroup.Item>
                            ))}
                             <ListGroup.Item className="summary-item bg-transparent px-0 " style={{ color: '#00ffea' }}>
                                <span>Subtotal</span>
                                <strong>${subtotal.toLocaleString('es-CL')}</strong>
                            </ListGroup.Item>
                            {esAlumnoDuoc && (
                                <ListGroup.Item className="summary-item bg-transparent px-0" style={{ color: '#00ffea' }}>
                                    <span>Descuento Duoc UC (15%)</span>
                                    <strong>-${Math.round(descuento).toLocaleString('es-CL')}</strong>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item className="summary-total bg-transparent px-0" style={{ color: '#00ffea' }}>
                                <span>Total a Pagar</span>
                                <strong>${Math.round(totalFinal).toLocaleString('es-CL')}</strong>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Col>

                {/* --- Columna Formularios --- */}
                <Col md={7} lg={6} className="text-start">
                    <Form noValidate onSubmit={handlePurchase}>
                        <h4 className="checkout-section-title">Información del Cliente</h4>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="checkoutFirstName" className="mb-3 mb-md-0">
                                <Form.Label className="checkout-form-label">Nombre</Form.Label>
                                <Form.Control type="text" className="checkout-form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="checkoutLastName">
                                <Form.Label className="checkout-form-label">Apellidos</Form.Label>
                                <Form.Control type="text" className="checkout-form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="checkoutEmail">
                            <Form.Label className="checkout-form-label">Correo Electrónico</Form.Label>
                            <Form.Control type="email" className="checkout-form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>

                        <h4 className="checkout-section-title mt-4">Dirección de Entrega</h4>
                        <Form.Group className="mb-3" controlId="checkoutStreet">
                            <Form.Label className="checkout-form-label">Calle y Número</Form.Label>
                            <Form.Control type="text" className="checkout-form-control" value={street} onChange={(e) => setStreet(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="checkoutDepartment">
                            <Form.Label className="checkout-form-label">Departamento (Opcional)</Form.Label>
                            <Form.Control type="text" className="checkout-form-control" value={department} onChange={(e) => setDepartment(e.target.value)} />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="checkoutRegion">
                                <Form.Label className="checkout-form-label">Región</Form.Label>
                                <Form.Select className="checkout-form-select" value={selectedRegionId} onChange={(e) => setSelectedRegionId(e.target.value)} required>
                                    <option value="">Selecciona una Región...</option>
                                    {regionsAndComunas.map(region => (<option key={region.id} value={region.id}>{region.name}</option>))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="checkoutComuna">
                                <Form.Label className="checkout-form-label">Comuna</Form.Label>
                                <Form.Select className="checkout-form-select" value={selectedComunaId} onChange={(e) => setSelectedComunaId(e.target.value)} required disabled={!selectedRegionId || availableComunas.length === 0}>
                                    <option value="">{selectedRegionId ? 'Selecciona una Comuna...' : '-- Primero elige Región --'}</option>
                                    {availableComunas.map(comuna => (<option key={comuna.id} value={comuna.id}>{comuna.name}</option>))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="checkoutIndications">
                            <Form.Label className="checkout-form-label">Indicaciones para la Entrega (Opcional)</Form.Label>
                            <Form.Control as="textarea" rows={2} className="checkout-form-control" placeholder="Ej: Entre calles, color del edificio, no tiene timbre..." value={indications} onChange={(e) => setIndications(e.target.value)} />
                        </Form.Group>

                        <h4 className="checkout-section-title mt-4">Información de Pago (Simulado)</h4>
                        <Alert variant="warning" className="mb-3"><strong>Nota:</strong> Esta es una simulación. No ingreses datos reales.</Alert>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={6} controlId="checkoutCardNumber">
                                <Form.Label className="checkout-form-label">Número de Tarjeta</Form.Label>
                                <Form.Control type="text" className="checkout-form-control" value={cardNumber} onChange={(e) => { const v=e.target.value.replace(/\D/g,'').slice(0,16); setCardNumber(v.replace(/(.{4})/g,'$1 ').trim().slice(0,19)); }} placeholder="XXXX XXXX XXXX XXXX" required />
                            </Form.Group>
                             <Form.Group as={Col} md={3} controlId="checkoutCardExpiry" className="mb-3 mb-md-0">
                                <Form.Label className="checkout-form-label">Vencimiento</Form.Label>
                                <Form.Control type="text" className="checkout-form-control" value={cardExpiry} onChange={(e) => { let v=e.target.value.replace(/\D/g,''); if(v.length>2) v=v.slice(0,2)+'/'+v.slice(2,4); setCardExpiry(v.slice(0,5)); }} placeholder="MM/AA" required />
                            </Form.Group>
                            <Form.Group as={Col} md={3} controlId="checkoutCardCvv">
                                <Form.Label className="checkout-form-label">CVV</Form.Label>
                                <Form.Control type="text" className="checkout-form-control" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="XXX" required />
                            </Form.Group>
                        </Row>

                        <hr style={{ borderColor: '#45a29e' }} className="my-4"/>

                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                        <Button variant="success" size="lg" type="submit" className="w-100 checkout-pay-button" disabled={!isFormValid}>
                            Pagar ahora ${Math.round(totalFinal).toLocaleString('es-CL')}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutPage;
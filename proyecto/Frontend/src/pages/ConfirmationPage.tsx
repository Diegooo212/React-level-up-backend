// src/pages/ConfirmationPage.tsx
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { OrderSummary } from '../types/OrderSummary'; 
import { LinkContainer } from 'react-router-bootstrap';


const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData as OrderSummary | null;

  const handlePrintPdf = () => {
    alert('Simulando descarga de Boleta PDF...');
  };
  const handleSendEmail = () => {
    alert(`Boleta enviada al correo ${orderData?.user?.email || 'registrado'} (simulado).`);
  };
  const handleRetryPayment = () => {
    navigate('/checkout');
  };

  if (!orderData || !orderData.items || orderData.items.length === 0 || !orderData.user) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="danger">
          <h2>Error al Cargar la Información del Pedido</h2>
          <p>No se encontraron los detalles de la compra o el carrito estaba vacío. Es posible que hayas accedido a esta página directamente.</p>
          <LinkContainer to="/">
            <Button variant="primary"> Volver al Inicio</Button>
          </LinkContainer>
        </Alert>
      </Container>
    );
  }

  
  const paymentSuccess = true;

  return (
    <Container className="my-5">
      <Card style={{ backgroundColor: '#1f2833', color: '#c5c6c7', padding: '30px', borderRadius: '15px' }}>
        <Card.Header className="text-center border-0 bg-transparent pb-0">
          <h1 style={{ color: '#66fcf1' }}>{paymentSuccess ? '¡Compra Realizada con Éxito!' : 'Problema con el Pago'}</h1>
          <p>Gracias por tu pedido, {orderData.user.firstName || orderData.user.email}.</p>
          <hr style={{ borderColor: '#45a29e' }} />
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <h4 style={{ color: '#00ffea' }}>Detalles del Cliente</h4>
              <p>
                <strong>Nombre:</strong> {orderData.user.firstName} {orderData.user.lastName}<br />
                <strong>Email:</strong> {orderData.user.email}
              </p>
              <h4 style={{ color: '#00ffea' }} className="mt-4">Dirección de Envío</h4>
              <p>
                {orderData.shippingAddress.street}<br />
                {orderData.shippingAddress.department && `Depto: ${orderData.shippingAddress.department}<br />`}
                Comuna ID: {orderData.shippingAddress.comunaId}<br />
                Región ID: {orderData.shippingAddress.regionId}<br />
                {orderData.shippingAddress.indications && `Indicaciones: ${orderData.shippingAddress.indications}`}
              </p>
              <h4 style={{ color: '#00ffea' }} className="mt-4">Resumen del Pedido</h4>
              <p>
                <strong>ID Pedido:</strong> {orderData.orderId}<br />
                <strong>Fecha:</strong> {orderData.orderDate}
              </p>
               <h4 style={{ color: '#00ffea' }} className="mt-4">Pago</h4>
               <p>Tarjeta terminada en: {orderData.paymentInfo.cardNumberLast4}</p>
            </Col>

            <Col md={6}>
              <h4 style={{ color: '#00ffea' }}>Productos Comprados</h4>
              <ListGroup variant="flush">
                {orderData.items.map(item => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center" style={{ backgroundColor: 'transparent', color: '#c5c6c7', borderBottom: '1px solid #45a29e', paddingLeft: 0, paddingRight: 0 }}>
                    <span>{item.name} (x{item.cantidad})</span>
                    <span style={{ whiteSpace: 'nowrap' }}>${(item.price * item.cantidad).toLocaleString('es-CL')}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {/* Totales */}
              <div className="text-end mt-3">
                <p>Subtotal: ${orderData.subtotal.toLocaleString('es-CL')}</p>
                {orderData.discount > 0 && (
                  <p style={{ color: '#00ffea' }}>Descuento: -${orderData.discount.toLocaleString('es-CL')}</p>
                )}
                <hr style={{ borderColor: '#45a29e' }} />
                <h4 style={{ color: '#66fcf1' }}>Total Pagado: ${orderData.total.toLocaleString('es-CL')}</h4>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-center border-0 bg-transparent pt-4">
          {paymentSuccess ? (
            <>
              <Button variant="info" onClick={handlePrintPdf} className="me-2 mb-2 mb-md-0">Imprimir Boleta (PDF)</Button>
              <Button variant="secondary" onClick={handleSendEmail}>Enviar Boleta por Correo</Button>
            </>
          ) : (
            <>
              <Alert variant="warning">Hubo un problema al procesar tu pago.</Alert>
              <Button variant="danger" onClick={handleRetryPayment}>Volver a Realizar el Pago</Button>
            </>
          )}
           <div className="mt-4">
                <LinkContainer to="/">
                    <Button variant="outline-light" size="sm" >Volver a la Tienda</Button>
                </LinkContainer>
           </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ConfirmationPage;
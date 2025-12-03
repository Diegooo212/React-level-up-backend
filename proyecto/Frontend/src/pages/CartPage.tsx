// src/pages/CartPage.tsx
import React from 'react';
import { Container, Table, Button, Image, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
    console.log("--- Renderizando CartPage ---"); 
    const { cartItems, removeFromCart, changeQuantity, clearCart } = useCart();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const qty = Number(item.cantidad) || 0;
        console.log(`Calculando: ${sum} + (${price} * ${qty})`); 
        return sum + price * qty;
    }, 0);
    
    const esAlumnoDuoc = currentUser?.email?.toLowerCase().endsWith('@duocuc.cl') ?? false;
    const descuento = esAlumnoDuoc ? subtotal * 0.15 : 0;
    const totalFinal = subtotal - descuento;
    
    console.log("Totales:", { subtotal, descuento, totalFinal, esAlumnoDuoc }); 

    const handleProcessPurchase = () => {
        navigate('/checkout');
    };

    return (
        <Container fluid className="my-4 carrito-container">
            <h2 className="text-center mb-4" style={{ color: '#66fcf1' }}>Resumen de tu compra</h2>
            <Table striped bordered hover responsive variant="dark" className="carrito-table align-middle">
                <thead>
                    <tr>
                        <th style={{ width: '40%' }}>Producto</th>
                        <th>Marca</th>
                        <th>Precio Unit.</th>
                        <th>Cantidad (Stock)</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.length === 0 ? (
                        <tr><td colSpan={6} className="text-center">Tu carrito está vacío</td></tr>
                    ) : (
                        cartItems.map(item => {
                            const itemSubtotalCalc = (Number(item.price) || 0) * (Number(item.cantidad) || 0);
                            return (
                                <tr key={item.id}>
                                    <td>
                                        <Image
                                            src={item.img || 'https://via.placeholder.com/60'}
                                            alt={item.name}
                                            className="carrito-img me-2"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://via.placeholder.com/60';
                                              }}
                                            style={{ width: '60px', height: 'auto', objectFit: 'contain', borderRadius: '4px' }}
                                        />
                                        {item.name}
                                    </td>
                                    <td>{item.brand}</td>
                                    <td>${(Number(item.price) || 0).toLocaleString('es-CL')}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="outline-secondary"
                                            onClick={() => changeQuantity(item.id, -1)}
                                            disabled={item.cantidad <= 1}
                                        >
                                            ➖
                                        </Button>
                                        <span className="mx-2">{item.cantidad}</span>
                                        <Button
                                            size="sm"
                                            variant="outline-secondary"
                                            onClick={() => changeQuantity(item.id, 1)}
                                            disabled={item.cantidad >= item.stock}
                                        >
                                            ➕
                                        </Button>
                                        <small className="d-block text-muted">Stock: {item.stock}</small>
                                    </td>
                                    <td>${itemSubtotalCalc.toLocaleString('es-CL')}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            ❌
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </Table>

            <div className="carrito-total text-end mt-4">
                <p style={{ fontSize: '1.2rem', color: '#45a29e', marginBottom: '5px' }}>
                    Subtotal:
                    <span style={{ color: '#00ffea', fontWeight: 'bold', marginLeft: '10px' }}>
                        ${subtotal.toLocaleString('es-CL')}
                    </span>
                </p>
                {esAlumnoDuoc && (
                    <p style={{ fontSize: '1.2rem', color: '#45a29e', marginBottom: '15px' }}>
                        Descuento Duoc UC (15%):
                        <span style={{ color: '#00ffea', fontWeight: 'bold', marginLeft: '10px' }}>
                            -${Math.round(descuento).toLocaleString('es-CL')}
                        </span>
                    </p>
                )}
                <hr style={{ borderColor: '#45a29e' }}/>
                <h3 style={{ color: '#66fcf1' }}>
                    Total a Pagar:
                    <span style={{ marginLeft: '10px' }}>
                         ${Math.round(totalFinal).toLocaleString('es-CL')}
                    </span>
                 </h3>
                <Button
                    variant="success"
                    size="lg"
                    className="btn-comprar mt-3"
                    onClick={handleProcessPurchase}
                    disabled={cartItems.length === 0}
                >
                    Finalizar Compra
                </Button>
            </div>
            {cartItems.some(item => item.cantidad >= item.stock) && (
                 <Alert variant="warning" className="mt-3">
                     Has alcanzado el stock máximo para uno o más productos.
                 </Alert>
             )}
        </Container>
    );
};

export default CartPage;
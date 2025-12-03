// src/components/layout/Header.tsx
import React from 'react';
import { Navbar, Nav, Container, Offcanvas, Badge, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.css'; // Usaremos el mismo archivo CSS

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { getCartTotalQuantity } = useCart();

  const totalItemsEnCarrito = getCartTotalQuantity();
  const isAdmin = currentUser?.role === 'admin';

  const [showOffcanvas, setShowOffcanvas] = React.useState(false);
  const handleClose = () => setShowOffcanvas(false);
  const handleToggle = () => setShowOffcanvas((prev) => !prev);

  return (
    <Navbar 
      sticky="top" 
      expand="lg" 
      className={styles.navbarCustom}
      variant="dark"
      expanded={showOffcanvas}
    >
      <Container fluid>
        
        <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>
          Level-Up Gamer
        </Navbar.Brand>

        
        <Navbar.Toggle 
          aria-controls="main-nav-offcanvas" 
          className={`${styles.navbarToggler} d-lg-none`}
          onClick={handleToggle}
        />

        
        <Nav className="mx-auto d-none d-lg-flex">
          <Nav.Link as={NavLink} to="/" className={styles.navLink} end>Inicio</Nav.Link>
          <Nav.Link as={NavLink} to="/productos" className={styles.navLink}>Productos</Nav.Link>
          <Nav.Link as={NavLink} to="/eventos" className={styles.navLink}>Eventos</Nav.Link>
          <Nav.Link as={NavLink} to="/nosotros" className={styles.navLink}>Nosotros</Nav.Link>
          <Nav.Link as={NavLink} to="/contacto" className={styles.navLink}>Contacto</Nav.Link>
        </Nav>

        <Nav className="d-flex flex-row align-items-center">
          
          <div className="d-none d-lg-flex align-items-center">
            {isAdmin && (
              <Nav.Link as={Link} to="/admin" className={`${styles.navLink} ${styles.adminLink}`}>
                Admin
              </Nav.Link>
            )}
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/perfil" className={styles.navLink}>
                  {currentUser.email}
                </Nav.Link>
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  onClick={logout}
                  className={styles.logoutButton}
                >
                  Salir
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className={styles.navLink}>
                Iniciar Sesión
              </Nav.Link>
            )}
          </div>

          <Nav.Link as={Link} to="/carrito" className={`${styles.navLink} ${styles.cartLink}`}>
            <i className="bi bi-cart-fill fs-4"></i> 
            {totalItemsEnCarrito > 0 && (
              <Badge pill bg="danger" className={styles.cartBadge}>
                {totalItemsEnCarrito}
              </Badge>
            )}
          </Nav.Link>
        </Nav>

        
        <Navbar.Offcanvas
          id="main-nav-offcanvas"
          placement="start"
          className={`${styles.offcanvasMenu} d-lg-none`} 
          show={showOffcanvas}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            
            
            <Nav className="flex-column">
              <Nav.Link as={NavLink} to="/" className={styles.offcanvasLink} onClick={handleClose} end>Inicio</Nav.Link>
              <Nav.Link as={NavLink} to="/productos" className={styles.offcanvasLink} onClick={handleClose}>Productos</Nav.Link>
              <Nav.Link as={NavLink} to="/eventos" className={styles.offcanvasLink} onClick={handleClose}>Eventos</Nav.Link>
              <Nav.Link as={NavLink} to="/nosotros" className={styles.offcanvasLink} onClick={handleClose}>Nosotros</Nav.Link>
              <Nav.Link as={NavLink} to="/contacto" className={styles.offcanvasLink} onClick={handleClose}>Contacto</Nav.Link>
            </Nav>

            <Nav className="flex-column border-top border-secondary mt-3 pt-3">
              {currentUser ? (
                <>
                  <Nav.Link as={Link} to="/perfil" className={styles.offcanvasLink} onClick={handleClose}>Mi Perfil</Nav.Link>
                  {isAdmin && <Nav.Link as={Link} to="/admin" className={styles.offcanvasLink} onClick={handleClose}>Admin</Nav.Link>}
                  <Nav.Link onClick={() => { logout(); handleClose(); }} className={styles.offcanvasLink}>Cerrar Sesión</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login" className={styles.offcanvasLink} onClick={handleClose}>Iniciar Sesión</Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

      </Container>
    </Navbar>
  );
};

export default Header;
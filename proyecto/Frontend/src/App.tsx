// src/App.tsx
import React from 'react';
import { Route, Routes, Outlet, Link } from 'react-router-dom'; 

// Layouts
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Estilos
import './index.css'; 

// Páginas Públicas
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ProfilePage from './pages/ProfilePage';
import EventsPage from './pages/EventsPage';
import NosotrosPage from './pages/NosotrosPage';
import ContactoPage from './pages/ContactoPage';

// Páginas de Admin
import ProtectedRoute from './components/common/ProtectedRoute'; 
import AdminLayout from './pages/admin/AdminLayout'; 
import AdminDashboard from './pages/admin/AdminDashboard'; 
import AdminProductos from './pages/admin/AdminProductos';
import AdminOrdenes from './pages/admin/AdminOrdenes';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminCategories from './pages/admin/AdminCategories';
 


const PublicLayout = () => (
  <>
    <Header />
    <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
      <Outlet /> 
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="productos" element={<ProductsPage />} />
          <Route path="productos/:categoryId" element={<CategoryProductsPage />} />
          <Route path="carrito" element={<CartPage />} /> 
          <Route path="login" element={<LoginPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="contacto" element={<ContactoPage />} />
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="eventos" element={<EventsPage />} />
          <Route path="nosotros" element={<NosotrosPage />} />
          <Route path="confirmacion" element={<ConfirmationPage />} />
          <Route path="registro" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} /> 
            <Route path="productos" element={<AdminProductos />} /> 
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="ordenes" element={<AdminOrdenes />} /> 
            <Route path="categorias" element={<AdminCategories />} />
            
          </Route>
        </Route>

        <Route path="*" element={
          <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>404 - Página no encontrada</h1>
            <Link to="/">Volver al inicio</Link>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import '../../style/adminLayout.css'; 



const AdminLayout = () => {
  const { logout, currentUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <div className="admin-container">
      
      <nav className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h3>LevelUp Admin</h3>
          <span>Bienvenido, {currentUser?.profile?.firstName || currentUser?.email}</span>
        </div>

        <ul className="admin-sidebar-nav">
          
          <li>
            <Link to="/admin">
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="productos">
              <span>Productos</span>
            </Link>
          </li>
          <li>
            <Link to="categorias">
                <span>Categorías</span>
                </Link>
            </li>
          <li>
            <Link to="ordenes">
              <span>Órdenes</span>
            </Link>
          </li>
          <li>
            <Link to="usuarios">
              <span>Usuarios</span>
            </Link>
          </li>
        </ul>

        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-footer-link">
            Ir a la Tienda
          </Link>
          <button onClick={handleLogout} className="admin-logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <main className="admin-content">
        
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
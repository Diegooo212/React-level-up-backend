import React from 'react';


import { useProducts } from '../../context/ProductContext';
// -----------------------

import '../../style/adminDashboard.css';


interface DashboardCardProps {
  title: string;
  value: string | number;
  info: string;
  color: 'blue' | 'green' | 'yellow';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, info, color }) => {
  return (
    <div className={`dashboard-card ${color}`}>
      <div className="card-icon">
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <span className="card-value">{value}</span>
        <p className="card-info">{info}</p>
      </div>
    </div>
  );
};



const AdminDashboard = () => {
  
  const { products } = useProducts();
  const totalProducts = products.length;

  const totalOrders = 1234; 
  const totalUsers = 890; 

  return (
    <div className="admin-dashboard-container">
      <h1>Panel de Administración</h1>
      <p className="dashboard-subtitle">Resumen de las actividades diarias.</p>

      <div className="dashboard-cards-grid">
        
        <DashboardCard 
          title="Compras"
          value={totalOrders}
          info="Probabilidad de aumento: 20%"
          color="blue"
        />

        <DashboardCard 
          title="Productos"
          value={totalProducts}
          info={`Inventario actual: ${totalProducts} items`}
          color="green"
        />

        <DashboardCard 
          title="Usuarios"
          value={totalUsers}
          info="Nuevos usuarios este mes: 120"
          color="yellow"
        />

      </div>
    </div>
  );
};

export default AdminDashboard;
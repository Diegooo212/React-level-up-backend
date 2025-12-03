import React, { useState } from 'react';

import { orders as initialOrders } from '../../data/orders'; 
import { Order, OrderStatus } from '../../types/Order'; 
import '../../style/adminOrdenes.css';


const AdminOrdenes = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const getStatusClass = (status: OrderStatus): string => {
    switch (status) {
      case 'Entregado':
        return 'status-entregado';
      case 'Enviado':
        return 'status-enviado';
      case 'Procesando':
        return 'status-procesando';
      case 'Cancelado':
        return 'status-cancelado';
      default:
        return '';
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Gestión de Órdenes ({orders.length})</h1>
      </div>

      <div className="admin-table-container">
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>ID Orden</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  <div>{order.customerName}</div>
                  <small>{order.customerEmail}</small>
                </td>
                <td>{order.date}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className="admin-view-btn">
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdenes;
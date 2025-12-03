import React, { useState } from 'react';
import { users as initialUsers } from '../../data/users';
import { AdminUser, UserRole, UserStatus } from '../../types/AdminUser';
import '../../style/adminUsuarios.css';

const AdminUsuarios = () => {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);

  const getRoleClass = (role: UserRole): string => {
    return role === 'admin' ? 'role-admin' : 'role-user';
  };
  
  const getStatusClass = (status: UserStatus): string => {
     return status === 'Activo' ? 'status-activo' : 'status-suspendido';
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Gestión de Usuarios ({users.length})</h1>
      </div>

      <div className="admin-table-container">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha de Ingreso</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.dateJoined}</td>
                <td>
                  <span className={`status-badge ${getRoleClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                   <span className={`status-badge ${getStatusClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="admin-edit-btn">Editar Rol</button>
                  <button className="admin-suspend-btn">
                    {user.status === 'Activo' ? 'Suspender' : 'Activar'}
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

export default AdminUsuarios;
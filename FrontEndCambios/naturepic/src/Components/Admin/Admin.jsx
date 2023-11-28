import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Admin.css'; 

function Admin() {
  return (
    <div>
      <div className="admin-panel">
        <nav>
          <ul>
            <li><Link to="agregar-producto">Agregar Producto</Link></li>
            <li><Link to="lista-de-productos">Lista de Productos</Link></li>
            <li><Link to="usuarios">Gestionar Usuarios</Link></li>
          </ul>
        </nav>
        <Outlet/>
      </div>
      <p className="mobile-error">Lo sentimos, el panel de administración no está disponible en dispositivos móviles.</p>
    </div>
  );
}

export default Admin;
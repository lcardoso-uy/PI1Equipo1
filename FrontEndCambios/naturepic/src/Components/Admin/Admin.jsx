import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Admin() {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <nav>
        <ul>
          <li><Link to="agregar-producto">Agregar Producto</Link></li>
          <li><Link to="lista-de-productos">Lista de Productos</Link></li>
        </ul>
      </nav>
      <Outlet/>
      <button className='delete-button'>Eliminar Producto</button>
    </div>
  );
}

export default Admin;
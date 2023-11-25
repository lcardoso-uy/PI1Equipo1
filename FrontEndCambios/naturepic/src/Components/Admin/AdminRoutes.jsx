import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import Admin from './Admin';
import AgregarProducto from './AgregarProducto';
import ListarProductos from './ListarProductos';
import ListarUsuarios from './ListarUsuarios';


function AdminRoutes() {
  const navigate = useNavigate();
  const { usuario } = useContext(DataContext);
  const isAdmin = usuario && usuario.roles.includes("ROLE_ADMIN");

  useEffect(() => {

    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);


  return isAdmin ? (
    <Routes>
      <Route path="/" element={<Admin />}>
        <Route path="agregar-producto" element={<AgregarProducto />} />
        <Route path="lista-de-productos" element={<ListarProductos />} />
        <Route path="usuarios" element={<ListarUsuarios />} />
      </Route>
    </Routes>
  ) : null;
}

export default AdminRoutes;

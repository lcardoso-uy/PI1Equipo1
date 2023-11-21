import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../Context/DataContext';

function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const { asignarAdmin, revocarAdmin } = useContext(DataContext);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:8080/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
          console.log("Usuarios cargados:", data); // Depuración
        } else {
          console.error('Error al cargar usuarios');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsuarios();
  }, []); // Dependencias vacías para cargar solo una vez

  const handleAsignarAdmin = async (email) => {
    await asignarAdmin(email);
    // Actualizar estado para reflejar el cambio en la UI
    setUsuarios(usuarios.map(user => user.email === email ? { ...user, roles: 'ROLE_ADMIN' } : user));
  };

  const handleRevocarAdmin = async (email) => {
    await revocarAdmin(email);
    // Actualizar estado para reflejar el cambio en la UI
    setUsuarios(usuarios.map(user => user.email === email ? { ...user, roles: 'ROLE_USER' } : user));
  };

  return (
    <div>
      <h2>Listado de Usuarios</h2>
      <ul>
        {usuarios.map(user => (
          <li key={user.id}>
            <span>ID: {user.id}</span>
            <span>Email: {user.email}</span>
            <span>Rol: {user.roles}</span>
            {user.roles !== 'ROLE_ADMIN' && (
              <button onClick={() => handleAsignarAdmin(user.email)}>Asignar Admin</button>
            )}
            {user.roles === 'ROLE_ADMIN' && (
              <button onClick={() => handleRevocarAdmin(user.email)}>Revocar Admin</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarUsuarios;

import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../Context/DataContext';

function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const { actualizarRolUsuario } = useContext(DataContext);

  useEffect(() => {
    fetch('http://localhost:8080/users')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleRoleChange = (userId, newRole) => {
    actualizarRolUsuario(userId, newRole)
      .then(() => {
        setUsuarios(usuarios.map(user => user.id === userId ? { ...user, role: newRole } : user));
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Listado de Usuarios</h2>
      <ul>
        {usuarios.map(user => (
          <li key={user.id}>
            {user.name} - {user.role}
            <button onClick={() => handleRoleChange(user.id, 'ROLE_ADMIN')}>Hacer Admin</button>
            <button onClick={() => handleRoleChange(user.id, 'ROLE_USER')}>Quitar Admin</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarUsuarios;

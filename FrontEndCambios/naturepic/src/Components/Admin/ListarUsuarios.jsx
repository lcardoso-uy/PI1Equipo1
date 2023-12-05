import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import { AuthContext } from '../Context/AuthContext';

function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const { asignarAdmin, revocarAdmin } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/Users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
          console.log("Usuarios cargados:", data);
        } else {
          console.error('Error al cargar usuarios');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleAsignarAdmin = async (email) => {
    await asignarAdmin(email);

    setUsuarios(usuarios.map(user => 
      user.email === email ? { ...user, admin: true } : user
    ));
  };
  
  const handleRevocarAdmin = async (email) => {
    await revocarAdmin(email);
  
    setUsuarios(usuarios.map(user => 
      user.email === email ? { ...user, admin: false } : user
    ));
  };

  return (
    <div className="lista__usaurios">
      <ul>
        {usuarios.map(user => (
          <li key={user.email}> 
            <span>Email: {user.email}</span>
            <span>{user.admin ? 'ROLE_ADMIN' : 'ROLE_USER'}</span>
            {user.admin ? (
              <button onClick={() => handleRevocarAdmin(user.email)}>Quitar Admin</button>
            ) : (
              <button onClick={() => handleAsignarAdmin(user.email)}>Asignar Admin</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarUsuarios;
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoNaturePic from "../../../public/NaturePic-Logo 1.png";
import { DataContext } from '../Context/DataContext';

const Header = () => {
  const { usuario, cerrarSesion } = useContext(DataContext);

  useEffect(() => {
    console.log("Estado del usuario actualizado:", usuario);
  }, [usuario]);

  const getInitials = (firstname, surname) => {
    if (firstname && surname) {
        return `${firstname[0]}${surname[0]}`.toUpperCase();
    }
    return '';
  };

  const avatar = usuario ? getInitials(usuario.firstname, usuario.surname) : '';

  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src={logoNaturePic} alt="NaturePic" />
          <p>NaturePic</p>
        </Link>
      </div>
      <div className="header-buttons">
        {usuario ? (
          <div>
            <div className="user-info">
              <div className="avatar">{avatar}</div>
              <span>Bienvenido/a, {usuario.firstname}!</span>
            </div>
            <button className='cerrar-sesion' onClick={cerrarSesion}>Cerrar Sesión</button>
            {usuario && usuario.roles.includes('ROLE_ADMIN') && (
              <Link to="/admin">
                <button className='boton-admin-panel'>Panel de Administración</button>
              </Link>
            )}
          </div>
        ) : (
          <div className='header-buttons__CrearCuentaIniciarSesion'>
            <Link to="/registro">
              <button className='crear-cuenta'>Crear cuenta</button>
            </Link>
            <Link to="/iniciar-sesion">
              <button className='iniciar-sesion'>Iniciar sesión</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

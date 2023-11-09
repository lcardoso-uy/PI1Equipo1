import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoNaturePic from "../../../public/NaturePic-Logo 1.png";
import { DataContext } from '../Context/DataContext';

const Header = () => {
  const { usuario, cerrarSesion } = useContext(DataContext);

  // Función para obtener las iniciales del nombre y apellido del usuario
  const getInitials = (name, surname) => {
    return `${name[0]}${surname[0]}`.toUpperCase();
  };

  // Crear avatar con las iniciales
  const avatar = usuario ? getInitials(usuario.name, usuario.surname) : '';

  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src={logoNaturePic} alt="NaturePic" />
          <p>NaturePic</p>
        </Link>
      </div>
      <div className="Header-buttons">
        {usuario ? (
          <>
            <div className="user-info">
              <div className="avatar">{avatar}</div>
              <span>Bienvenido, {usuario.name}!</span>
            </div>
            <button className='cerrar-sesion' onClick={cerrarSesion}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/registro">
              <button className='crear-cuenta'>Crear cuenta</button>
            </Link>
            <Link to="/iniciar-sesion">
              <button className='iniciar-sesion'>Iniciar sesión</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

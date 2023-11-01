import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Home from '../Home/Home';
import logo from "../../../public/logo.png"
import { DataContext } from '../Context/DataContext';
  const Header = () => {
    const { usuario, cerrarSesion } = useContext(DataContext);
  
    return (
      <header>
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="NaturePic" />
          </Link>
        </div>
        <div className="Header-buttons">
          {usuario ? (
            <>
              <span>Bienvenido, {usuario.name}!</span>
              <button onClick={cerrarSesion}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/registro">
                <button className='crear-account'>Crear cuenta</button>
              </Link>
              <Link to="/iniciar-sesion">
                <button>Iniciar sesión</button>
              </Link>
            </>
          )}
        </div>
      </header>
    );
  };
  
  export default Header;
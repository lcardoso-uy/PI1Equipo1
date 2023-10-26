import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Home from '../Home/Home';
import logo from "../../../public/logo.png"

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="NaturePic" />
        </Link>
      </div>
      <div className="Header-buttons">
        <button className='crear-account'>Crear cuenta</button>
        <button>Iniciar sesión</button>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Home from '../Home/Home';

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src={<Home/>} alt="NaturePic" />
          <span>Lema de la Empresa</span>
        </Link>
      </div>
{/* RESPONSIVE PENDING */}
      <div className="Header-buttons">
        <button>Crear cuenta</button>
        <button>Iniciar sesión</button>
      </div>
    </header>
  );
};

export default Header;
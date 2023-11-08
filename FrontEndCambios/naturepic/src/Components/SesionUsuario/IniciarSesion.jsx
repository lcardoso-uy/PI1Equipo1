import React, { useState, useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import { useNavigate } from 'react-router-dom';
import './User.css';

const IniciarSesion = () => {
  const navigate = useNavigate();
  const { iniciarSesion } = useContext(DataContext);
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales({
      ...credenciales,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    
    if (!usuarioGuardado) {
      setError("No existe una cuenta con ese correo electrónico");
      return;
    }

    if (credenciales.email === usuarioGuardado.email && credenciales.password === usuarioGuardado.password) {
      navigate('/');
      iniciarSesion(usuarioGuardado);
    } else {
      setError("Correo electrónico o contraseña incorrectos");
    }
  };

  return (
<form onSubmit={handleSubmit} className="form__login">
  <div className="form__login-field">
    <label htmlFor="email">Email:</label>
    <input
      id="email"
      type="email"
      name="email"
      className="form__login-input"
      value={credenciales.email}
      onChange={handleChange}
    />
  </div>
  <div className="form__login-field">
    <label htmlFor="password">Password:</label>
    <input
      id="password"
      type="password"
      name="password"
      className="form__login-input"
      value={credenciales.password}
      onChange={handleChange}
    />
  </div>
  {error && <p className="form__login-mensajeError">{error}</p>}
  <button type="submit" className="form__login-boton">Iniciar Sesión</button>
</form>
  );
}

export default IniciarSesion;
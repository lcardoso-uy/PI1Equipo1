import React, { useState, useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={credenciales.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={credenciales.password}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p className="error">{error}</p>}
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default IniciarSesion;
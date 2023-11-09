// RegistroUsuario.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validarEmail, validarPassword, validarNombre, validarApellido, validarTerminos } from "./Validaciones";

const RegistroUsuario = () => {
  const navigate = useNavigate();

  const estadoUsuarioInicial = {
    name: "",
    surname: "",
    email: "",
    password: "",
    terminos: false,
  };

  const [usuario, setUsuario] = useState(estadoUsuarioInicial);
  const [errores, setErrores] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    terminos: false,
  });

  const [intentadoEnviar, setIntentadoEnviar] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valorActualizado = type === "checkbox" ? checked : value;

    setUsuario({
      ...usuario,
      [name]: valorActualizado
    });

    setErrores({
      ...errores,
      [name]: !validarCampo(name, valorActualizado)
    });
  }

  const validarCampo = (campo, valor) => {
    switch (campo) {
      case "email": return validarEmail(valor);
      case "password": return validarPassword(valor);
      case "terminos": return validarTerminos(valor);
      case "name": return validarNombre(valor);
      case "surname": return validarApellido(valor);
      default: return false;
    }
  }

  const formularioValido = () => {
    return validarNombre(usuario.name) &&
           validarApellido(usuario.surname) &&
           validarEmail(usuario.email) &&
           validarPassword(usuario.password) &&
           validarTerminos(usuario.terminos);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIntentadoEnviar(true);

    const erroresActuales = {
      name: !validarNombre(usuario.name),
      surname: !validarApellido(usuario.surname),
      email: !validarEmail(usuario.email),
      password: !validarPassword(usuario.password),
      terminos: !validarTerminos(usuario.terminos),
    };
    
    setErrores(erroresActuales);

    if (formularioValido()) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
      navigate("/iniciar-sesion");
    }
  }

  return (
<form onSubmit={handleSubmit} noValidate className="form__registro">
  <fieldset className="form__registro-fieldset">
    <legend className="form__registro-legend">Registro de Usuario</legend>
  
    <div className="form__registro-field">
      <label htmlFor="name" className="form__registro-label">Nombre:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={usuario.name}
        onChange={handleChange}
        className="form__registro-input"
      />
      {intentadoEnviar && errores.name && <span id="nameError" className="form__registro-mensajeError">Error en el nombre</span>}
    </div>

    <div className="form__registro-field">
      <label htmlFor="surname" className="form__registro-label">Apellido:</label>
      <input
        type="text"
        id="surname"
        name="surname"
        value={usuario.surname}
        onChange={handleChange}
        className="form__registro-input"
      />
      {intentadoEnviar && errores.surname && <span id="surnameError" className="form__registro-mensajeError">Error en el apellido</span>}
    </div>
  
    <div className="form__registro-field">
      <label htmlFor="email" className="form__registro-label">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={usuario.email}
        onChange={handleChange}
        className="form__registro-input"
      />
      {intentadoEnviar && errores.email && <span id="emailError" className="form__registro-mensajeError">Error en el Email</span>}
    </div>

    <div className="form__registro-field">
      <label htmlFor="password" className="form__registro-label">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={usuario.password}
        onChange={handleChange}
        className="form__registro-input"
      />
      {intentadoEnviar && errores.password && <span id="passwordError" className="form__registro-mensajeError">Error en el Password</span>}
    </div>

    <div className="form__registro-checkbox">
      <input
        type="checkbox"
        id="terminos"
        name="terminos"
        checked={usuario.terminos}
        onChange={handleChange}
      />
      <label htmlFor="terminos" className="form__registro-terminosLabel">
        Acepto términos y condiciones
      </label>
    </div>
    {intentadoEnviar && errores.terminos && <span id="terminosError" className="form__registro-mensajeError">Debe aceptar los términos y condiciones</span>}
  
    <button type="submit" className="form__registro-boton">Registrar</button>
  </fieldset>
</form>


  );
}

export default RegistroUsuario;
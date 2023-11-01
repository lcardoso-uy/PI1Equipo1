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
    <form onSubmit={handleSubmit} noValidate>
      <label>
        Nombre:
        <input
          type="text"
          id="name"
          name="name"
          value={usuario.name}
          onChange={handleChange}
        />
        {intentadoEnviar && errores.name && <span id="nameError" className="error">Error en el nombre</span>}
      </label>
      <br />

      <label>
        Apellido:
        <input
          type="text"
          id="surname"
          name="surname"
          value={usuario.surname}
          onChange={handleChange}
        />
        {intentadoEnviar && errores.surname && <span id="surnameError" className="error">Error en el apellido</span>}
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          id="email"
          name="email"
          value={usuario.email}
          onChange={handleChange}
        />
        {intentadoEnviar && errores.email && <span id="emailError" className="error">Error en el Email</span>}
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          id="password"
          name="password"
          value={usuario.password}
          onChange={handleChange}
        />
        {intentadoEnviar && errores.password && <span id="passwordError" className="error">Error en el Password</span>}
      </label>
      <br />
      <label>
        Acepto términos y condiciones
        <input
          type="checkbox"
          id="terminos"
          name="terminos"
          checked={usuario.terminos}
          onChange={handleChange}
        />
        {intentadoEnviar && errores.terminos && <span id="terminosError" className="error">Debe aceptar los términos y condiciones</span>}
      </label>
      <br />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default RegistroUsuario;
// Validaciones.js
export const validarEmail = (email) => {
  let regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  return regex.test(email);
}

export const validarPassword = (password) => {
  return password.length > 5 && !password.includes(" ");
}

export const validarNombre = (name) => {
  return name.length >= 3;
}

export const validarApellido = (surname) => {
  return surname.length >= 3;
}

export const validarTerminos = (terminos) => {
  return terminos;
}

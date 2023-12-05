export const validarFechas = (fechaInicio, fechaFin, fechaInicioProp, fechaFinProp) => {
    if (fechaInicio !== fechaInicioProp || fechaFin !== fechaFinProp) {
        return "Las fechas seleccionadas no coinciden con las disponibles para el producto.";
    }
    return null;
};

export const validarDetallesUsuario = (nombre, apellido, correo, usuario) => {
    if (nombre !== usuario?.firstname || apellido !== usuario?.surname || correo !== usuario?.email) {
        return "Los detalles del usuario no coinciden con los registrados.";
    }
    return null;
};

export const validarComentario = (comentario) => {
    if (comentario.length > 200) {
        return "El comentario no puede exceder los 200 caracteres.";
    }
    return null;
};

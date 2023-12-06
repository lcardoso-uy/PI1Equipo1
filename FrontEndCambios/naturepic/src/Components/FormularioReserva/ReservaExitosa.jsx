import React from 'react';
import { useLocation } from 'react-router-dom';

const ReservaExitosa = () => {
    const location = useLocation();
    const { nombreUsuario, apellidoUsuario, nombreProducto, fechaInicio, fechaFin } = location.state || {};

    return (
        <div className='contenedor-reserva-exitosa'>
            <h1>Reserva Completa</h1>
            <p>¡Felicidades, tu reserva para {nombreProducto} ha sido completada!</p>
            <p>Nombre: {nombreUsuario} {apellidoUsuario}</p>
            <p>Fecha inicial de reserva: {fechaInicio}</p>
            <p>Fecha final de reserva: {fechaFin}</p>
        </div>
    );
};

export default ReservaExitosa;

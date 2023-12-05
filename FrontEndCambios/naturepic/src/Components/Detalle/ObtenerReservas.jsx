import React from "react";

const ObtenerReservas = async () => {
    try {
        const response = await fetch('http://localhost:8080/authbookings/mybookings', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const reservas = await response.json();
        } else {
        }
    } catch (error) {
        console.error('Error al obtener reservas:', error);
    }
};


export default ObtenerReservas
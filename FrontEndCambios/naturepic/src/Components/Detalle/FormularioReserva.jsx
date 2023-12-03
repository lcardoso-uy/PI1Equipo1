import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import './Detalle.css';

const FormularioReserva = ({ productId, startDate: fechaInicioProp, endDate: fechaFinProp }) => {
    const [startDate, setStartDate] = useState(fechaInicioProp || '');
    const [endDate, setEndDate] = useState(fechaFinProp || '');
    const [comment, setComment] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);
    const { usuario } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!usuario) {
            navigate('/iniciar-sesion', { state: { message: 'Debes iniciar sesión para hacer una reserva.' } });
        }
    }, [usuario, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('authToken');
        const reserva = {
            start_date: startDate,
            end_date: endDate,
            comment: comment,
            user_info_id: usuario.id,
            producto_id: productId,
        };

        try {
            const response = await fetch('http://localhost:8080/authbookings/mybookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reserva)
            });

            if (response.ok) {
                alert('Reserva realizada con éxito');
                // Puedes redirigir al usuario a otra página o actualizar el estado de la aplicación aquí
            } else {
                alert('Error al realizar la reserva');
                // Puedes manejar errores de la API aquí
            }
        } catch (error) {
            console.error('Error al enviar la reserva:', error);
            // Manejar errores de conexión aquí
        }
    };

    return (
        <form className='formularioReserva' onSubmit={handleSubmit}>
            <label>Fecha de Inicio</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

            <label>Fecha de Fin</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

            <label>Comentario</label>
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />

            {isAvailable ? (
                <button type="submit">Reservar</button>
            ) : (
                <p>El producto no está disponible en las fechas seleccionadas.</p>
            )}
        </form>
    );
};

export default FormularioReserva;

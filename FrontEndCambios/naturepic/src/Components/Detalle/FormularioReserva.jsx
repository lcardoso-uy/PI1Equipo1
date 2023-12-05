import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import './Detalle.css';

const FormularioReserva = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { usuario } = useContext(AuthContext);

    // Extrae las fechas y el ID del producto del estado pasado
    const { startDate: fechaInicioProp, endDate: fechaFinProp, productId } = location.state || {};

    // Estados para las fechas y el comentario
    const [startDate, setStartDate] = useState(fechaInicioProp || '');
    const [endDate, setEndDate] = useState(fechaFinProp || '');
    const [comment, setComment] = useState('');

    // Verificar si el usuario está logueado
    useEffect(() => {
        if (!usuario) {
            navigate('/iniciar-sesion', { state: { message: 'Debes iniciar sesión para hacer una reserva.' } });
        }
    }, [usuario, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('authToken');
        const reserva = {
            productId: productId,  // Asegúrate de que esta clave coincida con lo que espera tu API
            startDate: startDate,
            endDate: endDate,
            comment: comment
        };
    
        try {
            const response = await fetch('http://localhost:8080/authbookings/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reserva)
            });
    
            if (response.ok) {
                navigate('/reserva/exito');
            } else {
                const errorData = await response.json();
                alert(`Error al realizar la reserva: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error al enviar la reserva:', error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="form__login"> {/* O usa 'form__registro' si prefieres ese estilo */}
        <fieldset className="form__login-fieldset">
            <legend>Reservar Producto</legend>

            <div className="form__login-field">
                <label htmlFor="startDate">Fecha de Inicio:</label>
                <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    className="form__login-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div className="form__login-field">
                <label htmlFor="endDate">Fecha de Fin:</label>
                <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    className="form__login-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <div className="form__login-field">
                <label htmlFor="comment">Comentario:</label>
                <textarea
                    id="comment"
                    name="comment"
                    className="form__login-input"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>

            <button type="submit" className="form__login-boton">Confirmar Reserva</button>
        </fieldset>
    </form>
    );
};

export default FormularioReserva;

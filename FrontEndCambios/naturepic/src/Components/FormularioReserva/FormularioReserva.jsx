import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import './Reserva.css';
import { validarFechas, validarDetallesUsuario, validarComentario } from './ValidacionesReserva';

const FormularioReserva = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { usuario } = useContext(AuthContext);

    const { startDate: fechaInicioProp, endDate: fechaFinProp, productId, productName } = location.state || {};

    const [startDate, setStartDate] = useState(fechaInicioProp || '');
    const [endDate, setEndDate] = useState(fechaFinProp || '');
    const [comment, setComment] = useState('');

    const [nombreUsuario, setNombreUsuario] = useState(usuario?.firstname || '');
    const [apellido, setApellido] = useState(usuario?.surname || '');
    const [correoElectronico, setCorreoElectronico] = useState(usuario?.email || '');

    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        if (!usuario) {
            navigate('/iniciar-sesion', { state: { message: 'Debes iniciar sesión para hacer una reserva.' } });
        }
    }, [usuario, navigate]);

    const validarDatos = () => {
        const errorFechas = validarFechas(startDate, endDate, fechaInicioProp, fechaFinProp);
        const errorUsuario = validarDetallesUsuario(nombreUsuario, apellido, correoElectronico, usuario);
        const errorComentario = validarComentario(comment);

        if (errorFechas || errorUsuario || errorComentario) {
            alert(errorFechas || errorUsuario || errorComentario);
            return false;
        }
        return true;
    };

    const confirmarReserva = () => {
        if (validarDatos()) {
            setMostrarModal(true);
        }
    };



    const realizarReserva = async () => {
        setMostrarModal(false);
        const token = localStorage.getItem('authToken');
        const reserva = {
            productId: productId,
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
                navigate('/reserva/exito', {
                    state: {
                        nombreUsuario: usuario?.firstname,
                        apellidoUsuario: usuario?.surname,
                        nombreProducto: productName,
                        fechaInicio: startDate,
                        fechaFin: endDate
                    }
                });
                
            } else {
                const errorData = await response.json();
                alert(`Error al realizar la reserva: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error al enviar la reserva:', error);
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        confirmarReserva();
    };

    return (
        <div className='formularioReserva'>
        <form onSubmit={handleSubmit} className="form__login">
        <fieldset className="form__login-fieldset">
            <legend>Reservar: {productName}</legend>

            <div className="form__login-field">
                    <label htmlFor="nombreUsuario">Nombre de Usuario: *</label>
                    <input
                        id="nombreUsuario"
                        type="text"
                        name="nombreUsuario"
                        className="form__login-input"
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                    />
                </div>
                <div className="form__login-field">
                    <label htmlFor="apellido">Apellido: *</label>
                    <input
                        id="apellido"
                        type="text"
                        name="apellido"
                        className="form__login-input"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>
                <div className="form__login-field">
                    <label htmlFor="correoElectronico">Correo Electrónico: *</label>
                    <input
                        id="correoElectronico"
                        type="email"
                        name="correoElectronico"
                        className="form__login-input"
                        value={correoElectronico}
                        onChange={(e) => setCorreoElectronico(e.target.value)}
                    />
                </div>
            <div className="form__login-field">
                <label htmlFor="startDate">Fecha de Inicio: *</label>
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
                <label htmlFor="endDate">Fecha de Fin: *</label>
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

            <button type="button" onClick={confirmarReserva} className="form__login-boton">Confirmar Reserva</button>
        </fieldset>
    </form>
            {/* Modal de Confirmación */}
            {mostrarModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmar Reserva</h2>
                        <p>¿Estás seguro de que quieres hacer esta reserva?</p>
                        <button onClick={realizarReserva}>Confirmar</button>
                        <button onClick={() => setMostrarModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}
    </div>
    );
};

export default FormularioReserva;

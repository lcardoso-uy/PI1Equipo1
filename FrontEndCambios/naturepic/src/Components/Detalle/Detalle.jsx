import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import InfoProducto from './InfoProducto';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Detalle.css';
import { AuthContext } from '../Context/AuthContext';

const Detalle = () => {
    const { productId } = useParams();
    const { products } = useContext(DataContext);
    const [product, setProduct] = useState(null);
    const [disponibilidad, setDisponibilidad] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [fechaInicioReserva, setFechaInicioReserva] = useState(null);
    const [fechaFinReserva, setFechaFinReserva] = useState(null);
    const { usuario } = useContext(AuthContext)
    const [mostrarModal, setMostrarModal] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const selectedProduct = products.find(p => p.id === parseInt(productId));
        setProduct(selectedProduct || null);
        cargarDisponibilidad();
    }, [productId, products]);

    const cargarDisponibilidad = async () => {
        const fechaInicio = new Date();
        const fechaFin = new Date();
        fechaFin.setFullYear(fechaFin.getFullYear() + 1);

        try {
            const response = await fetch(`http://localhost:8080/product-calendar/calendar/${productId}?start=${fechaInicio.toISOString().split('T')[0]}&end=${fechaFin.toISOString().split('T')[0]}`);
            if (response.ok) {
                const data = await response.json();
                setDisponibilidad(data);
            } else {
                setError('Error al cargar la disponibilidad.');
            }
        } catch (error) {
            setError('Error al conectar con el servidor.');
        } finally {
            setCargando(false);
        }
    };

    const verificarDisponibilidadYRedirigir = () => {
        if (!fechaInicioReserva || !fechaFinReserva) {
            alert('Por favor, selecciona ambas fechas.');
            return;
        }
    
        const inicio = new Date(fechaInicioReserva);
        const fin = new Date(fechaFinReserva);
        let fechaActual = new Date(inicio);
    
        while (fechaActual <= fin) {
            const fechaStr = fechaActual.toISOString().split('T')[0];
            const disponible = disponibilidad.some(item => item.date === fechaStr && item.status === 'DISPONIBLE');
    
            if (!disponible) {
                alert('Algunas de las fechas seleccionadas no están disponibles para reserva.');
                return;
            }
    
            fechaActual.setDate(fechaActual.getDate() + 1);
        }
    
        if (!usuario) {
            localStorage.setItem('fromProductDetail', 'true');
            navigate('/iniciar-sesion');
        } else {
            setMostrarModal(true);
        }
    };
    

    const ModalConfirmacion = ({ onClose, onConfirm }) => {
        return (
        <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmar Reserva</h2>
                        <p>¿Estás seguro de que quieres hacer esta reserva?</p>
                        <button onClick={() => {
                            onClose();
                            navigate('/reserva', {
                                state: {
                                    startDate: fechaInicioReserva.toISOString().split('T')[0],
                                    endDate: fechaFinReserva.toISOString().split('T')[0],
                                    productId: product.id,
                                    productName: product.name
                                }
                            });
                        }}>Confirmar</button>
                        <button onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            );
        };


    if (cargando) return <p>Cargando disponibilidad...</p>;
    if (error) return <p>Error: {error}</p>;


    const dayClassName = date => {
        const dateString = date.toISOString().split('T')[0];
        const isAvailable = disponibilidad.some(item => item.date === dateString && item.status === 'DISPONIBLE');
        let className = isAvailable ? 'available-date' : 'unavailable-date';

        if (fechaInicioReserva && fechaFinReserva) {
            const fechaInicioStr = fechaInicioReserva.toISOString().split('T')[0];
            const fechaFinStr = fechaFinReserva.toISOString().split('T')[0];
            if (dateString >= fechaInicioStr && dateString <= fechaFinStr) {
                className += ' selected-date';
            }
        }
        
        return className;
    };

    const irAGaleria = () => {
        navigate(`/galeria/${productId}`);
      };


    return (
        <>
            <div className="detalle-container">
                <div className='Info-producto'>
                {product && <InfoProducto product={product} onVerMasClicked={irAGaleria} />
}
                </div>
                <div className="detalle-producto">
                <h3>Disponibilidad:</h3>
                </div>
                <div className="disponibilidad-container">
                
                    <DatePicker
                        inline
                        selected={fechaInicioReserva}
                        onChange={date => setFechaInicioReserva(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Fecha inicio"
                        dayClassName={dayClassName}
                        className='detail__calendar'
                    />
                    <DatePicker
                        inline
                        selected={fechaFinReserva}
                        onChange={date => setFechaFinReserva(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Fecha fin"
                        dayClassName={dayClassName}
                        className='detail__calendar'
                    />
                </div>
                <button onClick={verificarDisponibilidadYRedirigir}
                    className='boton__disponibilidad__detalle'>Reservar</button>
            </div>
            {mostrarModal && (
            <ModalConfirmacion
                onConfirm={() => {
                    setMostrarModal(false);
                    navigate('/reserva', {
                        state: {
                            startDate: fechaInicioReserva.toISOString().split('T')[0],
                            endDate: fechaFinReserva.toISOString().split('T')[0],
                            productId: product.id
                        }
                    });
                }}
                onClose={() => setMostrarModal(false)}
            />
        )}
        </>
    );
};

export default Detalle;

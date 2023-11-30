import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import InfoProducto from './InfoProducto';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Detalle.css';

const Detalle = () => {
    const { productId } = useParams();
    const { products } = useContext(DataContext);
    const [product, setProduct] = useState(null);
    const [disponibilidad, setDisponibilidad] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [fechaInicioReserva, setFechaInicioReserva] = useState(null);
    const [fechaFinReserva, setFechaFinReserva] = useState(null);

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

    const verificarDisponibilidad = () => {
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

        alert('Las fechas seleccionadas están disponibles para reserva.');
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

    return (
        <div>
            <br /><br />
            <div className="detalle-container">
                {product && <InfoProducto product={product} />}
                <div className="disponibilidad-container">
                    <h3>Disponibilidad:</h3>
                    <DatePicker
                        inline
                        selected={fechaInicioReserva}
                        onChange={date => setFechaInicioReserva(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Fecha inicio"
                        dayClassName={dayClassName}
                    />
                    <DatePicker
                        inline
                        selected={fechaFinReserva}
                        onChange={date => setFechaFinReserva(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Fecha fin"
                        dayClassName={dayClassName}
                    />
                    <button onClick={verificarDisponibilidad}>Verificar Disponibilidad</button>
                </div>
            </div>
        </div>
    );
};

export default Detalle;

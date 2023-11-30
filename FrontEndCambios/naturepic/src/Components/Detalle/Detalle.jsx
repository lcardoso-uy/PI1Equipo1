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

    useEffect(() => {
        const selectedProduct = products.find(p => p.id === parseInt(productId));
        setProduct(selectedProduct || null);
        cargarDisponibilidad();
    }, [productId, products]);

    const cargarDisponibilidad = async () => {
        const fechaInicio = new Date();
        const fechaFin = new Date();
        fechaFin.setFullYear(fechaFin.getFullYear() + 1); // Establece un rango de un año a partir de ahora

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

    const isDateAvailable = date => {
        const dateString = date.toISOString().split('T')[0];
        return disponibilidad.some(item => item.date === dateString && item.status === 'DISPONIBLE');
    };

    if (cargando) return <p>Cargando disponibilidad...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <br /><br />
            <div className="detalle-container">
                <InfoProducto product={product} />
                <div className="disponibilidad-container">
                    <h3>Disponibilidad:</h3>
                    <DatePicker
                        inline
                        highlightDates={disponibilidad.map(item => new Date(item.date))}
                        dayClassName={date => isDateAvailable(date) ? 'available-date' : 'unavailable-date'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Detalle;

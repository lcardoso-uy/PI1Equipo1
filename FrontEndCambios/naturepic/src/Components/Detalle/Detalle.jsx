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
    const [fechasDisponibles, setFechasDisponibles] = useState([]);

    useEffect(() => {
        const selectedProduct = products.find(p => p.id === parseInt(productId));
        setProduct(selectedProduct || null);
        cargarDisponibilidad();
    }, [productId, products]);

    const cargarDisponibilidad = async () => {
        try {
            const response = await fetch(`http://localhost:8080/product-calendar/calendar/${productId}?start=2023-01-01&end=2023-12-31`);
            if (response.ok) {
                const data = await response.json();
                setDisponibilidad(data);
                const fechas = data.map(item => new Date(item.date));
                setFechasDisponibles(fechas);
            }
        } catch (error) {
            console.error('Error al cargar la disponibilidad:', error);
        }
    };

    const isDateAvailable = date => {
        return fechasDisponibles.some(fechaDisponible => 
            fechaDisponible.getDate() === date.getDate() && 
            fechaDisponible.getMonth() === date.getMonth() && 
            fechaDisponible.getFullYear() === date.getFullYear());
    };

    const highlightWithGreen = date => {
        return isDateAvailable(date) ? 'available-date' : undefined;
    };

    if (!product) return <p>Cargando...</p>;

    return (
        <div>
            <br /><br />
            <div className="detalle-container">
                <InfoProducto product={product} />
                <div className="disponibilidad-container">
                    <h3>Disponibilidad:</h3>
                    <DatePicker
                        inline
                        highlightDates={[{
                            "available-date": fechasDisponibles
                        }]}
                        dayClassName={highlightWithGreen}
                    />
                </div>
                {/* Agregar enlaces o botones según sea necesario */}
            </div>
        </div>
    );
};

export default Detalle;

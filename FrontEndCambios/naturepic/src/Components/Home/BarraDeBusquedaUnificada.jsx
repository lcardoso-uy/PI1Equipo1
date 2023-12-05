import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import lupa from "../../../public/Vector.png";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BarraDeBusquedaUnificada = () => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const navigate = useNavigate();
    const { buscarProductos } = useContext(DataContext);

    const formatFecha = fecha => fecha ? fecha.toISOString().split('T')[0] : '';

    const realizarBusqueda = async () => {
        const fechaInicioFormatted = formatFecha(fechaInicio);
        const fechaFinFormatted = formatFecha(fechaFin);
        const productos = await buscarProductos(terminoBusqueda, fechaInicioFormatted, fechaFinFormatted);
        setResultadosBusqueda(productos);
    };

    useEffect(() => {
        if (terminoBusqueda.length >= 3 || fechaInicio || fechaFin) {
            realizarBusqueda();
        }
    }, [terminoBusqueda, fechaInicio, fechaFin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await realizarBusqueda();
    
        let queryParam = '';
        if (fechaInicio && fechaFin) {
            queryParam = `nombre=${encodeURIComponent(terminoBusqueda || '')}&start=${formatFecha(fechaInicio)}&end=${formatFecha(fechaFin)}`;
        } else {
            queryParam = `nombre=${encodeURIComponent(terminoBusqueda)}`;
        }
    
        if (resultadosBusqueda.length > 1) {
            navigate(`/resultados?${queryParam}`);
        } else if (resultadosBusqueda.length === 1) {
            navigate(`/detalle/${resultadosBusqueda[0].id}`);
        } else {
            alert('No se encontraron productos con los criterios de búsqueda proporcionados.');
        }
    };
    

    return (
        <form className='serch__form' onSubmit={handleSubmit}>
            <input
                className='serchInput__form'
                type="text"
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
                placeholder="Buscar producto..."
            />
            <DatePicker className='serchInput__form__Calendar'
                selected={fechaInicio}
                onChange={date => setFechaInicio(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Fecha de inicio"
            />
            <DatePicker className='serchInput__form__Calendar'
                selected={fechaFin}
                onChange={date => setFechaFin(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Fecha final"
            />
            <button className='form__button' type="submit"><img src={lupa} alt="Buscar" /></button>
            {resultadosBusqueda.length > 0 && (
                <ul className='resultados-busqueda'>
                    {resultadosBusqueda.map(producto => (
                        <li key={producto.id} onClick={() => navigate(`/detalle/${producto.id}`)}>
                            {producto.name}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default BarraDeBusquedaUnificada;
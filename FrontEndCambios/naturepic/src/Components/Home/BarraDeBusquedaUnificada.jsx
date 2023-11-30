import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import lupa from "../../../public/Vector.png";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BarraDeBusquedaUnificada = () => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const navigate = useNavigate();
    const { buscarProductos } = useContext(DataContext);

    useEffect(() => {
        if (terminoBusqueda.length >= 3) {
            fetchSearchResults();
        }
    }, [terminoBusqueda, fechaInicio, fechaFin]);

    const fetchSearchResults = async () => {
        const formatFecha = fecha => fecha ? fecha.toISOString().split('T')[0] : '';
        const fechaInicioFormatted = formatFecha(fechaInicio);
        const fechaFinFormatted = formatFecha(fechaFin);

        const productosEncontrados = await buscarProductos(terminoBusqueda, fechaInicioFormatted, fechaFinFormatted);
        setResultadosBusqueda(productosEncontrados);
    };

    const handleSearchChange = (e) => {
        setTerminoBusqueda(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (terminoBusqueda.length >= 3 || (fechaInicio && fechaFin)) {
            await fetchSearchResults();
            if (resultadosBusqueda.length === 0) {
                alert('No se encontraron productos con los criterios de búsqueda proporcionados.');
            } else {
                // Navegar al primer producto encontrado si se desea
                navigate(`/detalle/${resultadosBusqueda[0].id}`);
            }
        }
    };
    

    return (
        <form className='serch__form' onSubmit={handleSubmit}>
            <input
                className='serchInput__form'
                type="text"
                value={terminoBusqueda}
                onChange={handleSearchChange}
                placeholder="Buscar producto..."
            />
            <DatePicker className='serchInput__form__Callendar'
                selected={fechaInicio}
                onChange={date => setFechaInicio(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Fecha inicio"
            />
            <DatePicker className='serchInput__form__Callendar'
                selected={fechaFin}
                onChange={date => setFechaFin(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Fecha fin"
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
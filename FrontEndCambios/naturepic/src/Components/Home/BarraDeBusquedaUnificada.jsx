import React, { useState, useContext, useCallback } from 'react';
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
    const {buscarProductos} = useContext(DataContext);


    const fetchSearchResults = async (query) => {
        const formatFecha = fecha => fecha ? fecha.toISOString().split('T')[0] : '';
        const fechaInicioFormatted = formatFecha(fechaInicio);
        const fechaFinFormatted = formatFecha(fechaFin);

        const productosEncontrados = await buscarProductos(query, fechaInicioFormatted, fechaFinFormatted);

        if (fechaInicioFormatted && fechaFinFormatted && productosEncontrados.length === 0) {
            alert("No hay productos disponibles en el rango de fechas seleccionado.");
        } else {
            setResultadosBusqueda(productosEncontrados);
        }
    };

    const handleSearchChange = (e) => {
        setTerminoBusqueda(e.target.value);
        if (e.target.value.length > 2) {
            fetchSearchResults(e.target.value);
        } else {
            setResultadosBusqueda([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (resultadosBusqueda && resultadosBusqueda.length > 0) {
            const productoId = resultadosBusqueda[0].id;
            navigate(`/detalle/${productoId}`);
        } else {
            alert('No se encontraron productos con los criterios de búsqueda proporcionados.');
        }
    };
    

    /*REVISAR SUBMIT*/
    

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
import React, { useState, useContext } from 'react';
import { DataContext } from '../Context/DataContext';

const BarraDeBusquedaAvanzada = () => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const { buscarProductos } = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes agregar validación para el formato de fecha si es necesario
        const productosEncontrados = await buscarProductos(terminoBusqueda, fechaInicio, fechaFin);
        console.log(productosEncontrados); // Manejar los productos encontrados
    };

    return (
        <form className='serch__form__advanced' onSubmit={handleSubmit}>
            <input
                type="text"
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
                placeholder="Buscar producto..."
            />
            <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                placeholder="Fecha inicio"
            />
            <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                placeholder="Fecha fin"
            />
            <button type="submit">Buscar</button>
        </form>
    );
};

export default BarraDeBusquedaAvanzada;

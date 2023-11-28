import React, { useState, useContext, useCallback } from 'react';
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
    const { buscarProductos, esProductoDisponible, products } = useContext(DataContext);

    const fetchSearchResults = async (query) => {
        const productosEncontrados = fechaInicio && fechaFin 
            ? await buscarProductos(query, fechaInicio, fechaFin) 
            : products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    
        console.log("Productos encontrados:", productosEncontrados);
        setResultadosBusqueda(productosEncontrados);
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
    
        console.log("Resultados de búsqueda:", resultadosBusqueda);
    
        if (resultadosBusqueda && resultadosBusqueda.length > 0) {
            const productoId = resultadosBusqueda[0].id;
    
            console.log("ID del producto seleccionado:", productoId);
    
            if (fechaInicio && fechaFin) {
                console.log("Verificando disponibilidad para las fechas:", { fechaInicio, fechaFin });
                const disponible = await esProductoDisponible(productoId, fechaInicio, fechaFin);
    
                console.log("Producto disponible:", disponible);
    
                if (disponible) {
                    navigate(`/detalle/${productoId}`);
                } else {
                    alert('El producto seleccionado no está disponible en el rango de fechas proporcionado.');
                }
            } else {
                navigate(`/detalle/${productoId}`);
            }
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
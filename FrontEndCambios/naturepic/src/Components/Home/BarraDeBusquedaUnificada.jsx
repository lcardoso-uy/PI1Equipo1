import lupa from "../../../public/Vector.png";
import './Home.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';

const BarraDeBusquedaUnificada = () => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const navigate = useNavigate();
    const { buscarProductos, products } = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Búsqueda simple o avanzada dependiendo de si se han proporcionado fechas
        const productosEncontrados = fechaInicio && fechaFin 
            ? await buscarProductos(terminoBusqueda, fechaInicio, fechaFin) 
            : products.filter(product => product.name.toLowerCase().includes(terminoBusqueda.toLowerCase()));

        if (productosEncontrados && productosEncontrados.length > 0) {
            // Redirigir al detalle del primer producto encontrado
            navigate(`/detalle/${productosEncontrados[0].id}`);
        } else {
            // Mostrar mensaje si no se encuentra ningún producto
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
            <button className='form__button' type="submit"><img src={lupa} alt="Buscar" /></button>
        </form>
    );
};

export default BarraDeBusquedaUnificada;

// const BarraDeBusquedaUnificada = () => {
//     const [terminoBusqueda, setTerminoBusqueda] = useState('');
//     const [fechaInicio, setFechaInicio] = useState('');
//     const [fechaFin, setFechaFin] = useState('');
//     const navigate = useNavigate();
//     const { buscarProductos, products, esProductoDisponible } = useContext(DataContext);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!fechaInicio && !fechaFin) {
//             // Búsqueda simple sin rango de fechas
//             const productoEncontrado = products.find(product => product.name.toLowerCase().includes(terminoBusqueda.toLowerCase()));
//             if (productoEncontrado) {
//                 navigate(`/detalle/${productoEncontrado.id}`); // Redirigir al detalle del producto
//             } else {
//                 console.log('Producto no encontrado');
//                 // Manejar el caso de no encontrar el producto
//             }
//         } else {
//             // Búsqueda avanzada con rango de fechas
//             const productoEncontrado = products.find(product => product.name.toLowerCase().includes(terminoBusqueda.toLowerCase()));
//             if (productoEncontrado && await esProductoDisponible(productoEncontrado.id, fechaInicio, fechaFin)) {
//                 navigate(`/detalle/${productoEncontrado.id}`); // Redirigir al detalle del producto si está disponible
//             } else {
//                 alert(`El producto ${productoEncontrado?.name || ''} no está disponible en el rango de fechas seleccionado.`);
//                 // Manejar el caso de no disponibilidad del producto
//             }
//         }
//     };

//     return (
//         <form className='serch__form' onSubmit={handleSubmit}>
//             <input className='serchInput__form'
//                 type="text"
//                 value={terminoBusqueda}
//                 onChange={(e) => setTerminoBusqueda(e.target.value)}
//                 placeholder="Buscar producto..."
//             />
//             <input
//                 type="date"
//                 value={fechaInicio}
//                 onChange={(e) => setFechaInicio(e.target.value)}
//                 placeholder="Fecha inicio"
//             />
//             <input
//                 type="date"
//                 value={fechaFin}
//                 onChange={(e) => setFechaFin(e.target.value)}
//                 placeholder="Fecha fin"
//             />
//             <button className='form__button' type="submit">Buscar</button>
//         </form>
//     );
// };

// export default BarraDeBusquedaUnificada;








import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ListaProductos = () => {
    const [searchParams] = useSearchParams();
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            setCargando(true);
            let url = 'http://localhost:8080/';
    
            const termino = searchParams.get('nombre');
            const fechaInicio = searchParams.get('start');
            const fechaFin = searchParams.get('end');
    
            if (fechaInicio && fechaFin) {
                url += `product-calendar/available?text=${encodeURIComponent(termino || '')}&start=${fechaInicio}&end=${fechaFin}`;
            } else {
                url += `authproducts/search?name=${encodeURIComponent(termino)}`;
            }
    
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setProductos(data);
                } else {
                    console.error('Error al obtener productos');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            } finally {
                setCargando(false);
            }
        };
    
        fetchProductos();
    }, [searchParams]);
    

    if (cargando) {
        return <div>Cargando productos...</div>;
    }

    return (
        <div className="Productos-random-contenedor">
            {productos.length > 0 ? 
                <>
                {productos.map(producto => (
                <div key={producto.id}     className="product-item">
                <p>{producto.name}</p>   
                <img src={producto.image_url} alt={producto.name} />
                </div>
                ))}                                         </> :
                <p>No se encontraron productos.</p>}
        </div>
    );
};

export default ListaProductos;

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
            const fechaInicio = searchParams.get('inicio');
            const fechaFin = searchParams.get('fin');

            if (fechaInicio && fechaFin) {
                    url += `product-calendar/available?text=${encodeURIComponent(termino || '')}&start=${fechaInicio}&end=${fechaFin}`;
                
            } else if (termino) {
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
        <div>
            <h2>Productos Encontrados</h2>
            {productos.length > 0 ? (
                <ul>
                    {productos.map(producto => (
                        <li key={producto.id}>
                            <h3>{producto.name}</h3>
                            <p>{producto.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron productos.</p>
            )}
        </div>
    );
};

export default ListaProductos;

import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        cargarProductosYCategorias();
    }, []);


    const buscarProductos = async (termino, fechaInicio, fechaFin) => {
        let url = 'http://localhost:8080/';
        if (fechaInicio && fechaFin) {
            url += 'product-calendar/available?';
            if (termino) {
                url += `text=${encodeURIComponent(termino)}&`;
            }
            url += `start=${fechaInicio}&end=${fechaFin}`;
        } else if (termino) {
            url += `authproducts/search?name=${encodeURIComponent(termino)}`;
        }
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error al buscar productos');
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};


    const cargarProductosYCategorias = async () => {
        
        // Carga de productos
        try {
            const response = await fetch("http://localhost:8080/products");
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error("Error al cargar productos");
            }
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }

        // Carga de categorías
        try {
            const response = await fetch("http://localhost:8080/categories");
            if (response.ok) {
                const data = await response.json();
                setCategorias(data);
            } else {
                console.error("Error al cargar categorías");
            }
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    };

    const value = {
        products,
        setProducts,
        usuario,
        categorias,
        setCategorias,
        buscarProductos,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
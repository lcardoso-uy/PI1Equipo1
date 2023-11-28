import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        image_url: '',
        category: '',
    });

    useEffect(() => {
        cargarProductosYCategorias();
        verificarTokenYObtenerUsuario();
    }, []);


    const buscarProductos = async (termino, fechaInicio, fechaFin) => {
        try {
            const url = `http://localhost:8080/product-calendar/available?text=${encodeURIComponent(termino)}&start=${fechaInicio}&end=${fechaFin}`;
            
            const token = localStorage.getItem('authToken');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    
            const response = await fetch(url, { headers });
            if (response.ok) {
                const data = await response.json();
                console.log("Data de buscarProductos:", data);
                return data;
            } else {
                console.error('Error al buscar productos');
                return [];
            }
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    };
    

    const esProductoDisponible = async (productoId, fechaInicio, fechaFin) => {
        try {
            const url = `http://localhost:8080/product-calendar/calendar/${productoId}?start=${fechaInicio}&end=${fechaFin}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            if (response.ok) {
                const disponibilidad = await response.json();
                console.log(`Disponibilidad del producto ${productoId}:`, disponibilidad);
                return disponibilidad.isAvailable;
            } else {
                const errorResponse = await response.json(); // Agregar esta línea
                console.error('Error al verificar la disponibilidad del producto:', errorResponse); // Modificar esta línea
                return false;
            }
        } catch (error) {
            console.error('Error en esProductoDisponible:', error);
            return false;
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

    const verificarTokenYObtenerUsuario = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            await obtenerInformacionUsuario(token);
        }
    };

    const obtenerInformacionUsuario = async (token) => {
        try {
            const response = await fetch('http://localhost:8080/auth/getUserInfo', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const userData = await response.json();
                setUsuario(userData);
                console.log(userData)
            } else {
                console.error('Token no válido o error al obtener información del usuario');
            }
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
        }
    };

    const iniciarSesion = async (credenciales) => {
        try {
            const response = await fetch('http://localhost:8080/auth/generateToken', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credenciales)
            });

            if (response.ok) {
                const token = await response.text();
                localStorage.setItem('authToken', token);
                await obtenerInformacionUsuario(token);
            } else {
                throw new Error('Error durante el inicio de sesión');
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
        }
    };

    const cerrarSesion = () => {
        setUsuario(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('usuario');
        /*localStorage.removeItem('usuario');*/
    };





    const asignarAdmin = async (email) => {
        try {
            const response = await fetch(`http://localhost:8080/auth/admin/assignAdmin/${email}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Rol de administrador asignado con éxito');
                // await actualizarInformacionUsuario();
            } else {
                console.error('Error al asignar rol de administrador');
            }
        } catch (error) {
            console.error('Error al asignar rol de administrador:', error);
        }
    };
    
    const revocarAdmin = async (email) => {
        try {
            const response = await fetch(`http://localhost:8080/auth/admin/revokeAdmin/${email}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Rol de administrador revocado con éxito');
                // await actualizarInformacionUsuario();
            } else {
                console.error('Error al revocar rol de administrador');
            }
        } catch (error) {
            console.error('Error al revocar rol de administrador:', error);
        }
    };

    const value = {
        products,
        setProducts,
        usuario,
        iniciarSesion,
        cerrarSesion,
        categorias,
        setCategorias,
        newProduct,
        setNewProduct,
        asignarAdmin,
        revocarAdmin,
        buscarProductos,
        esProductoDisponible,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;

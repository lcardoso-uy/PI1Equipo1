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

    // Cargar productos al iniciar la aplicación
    useEffect(() => {
        fetch("http://localhost:8080/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Failed to fetch products:", err));

        fetch("http://localhost:8080/categories")
            .then(res => res.json())
            .then(data => setCategorias(data))
            .catch(err => console.error("Failed to fetch categories:", err));

            const usuarioGuardado = localStorage.getItem('usuario');
            if (usuarioGuardado) {
                setUsuario(JSON.parse(usuarioGuardado));
            }
    }, []);

    // Función para iniciar sesión y establecer el estado del usuario
    const iniciarSesion = (userData) => {
        setUsuario(userData);
        localStorage.setItem('usuario', JSON.stringify(userData));
    };

    // Función para cerrar sesión y limpiar el estado del usuario
    const cerrarSesion = () => {
        setUsuario(null);
        localStorage.removeItem('authToken'); // Asegúrate de que esta clave coincida con la que usaste para almacenar el token JWT.
    };

    // Función para agregar un nuevo producto
    const agregarProducto = async (producto) => {
        try {
            const response = await fetch("http://localhost:8080/products", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto)
            });
            const nuevoProducto = await response.json();
            setProducts(prevProducts => [...prevProducts, nuevoProducto]);
            return nuevoProducto;
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    };

    // Función para actualizar el rol de un usuario
    const actualizarRolUsuario = async (userId, newRole) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole })
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el rol del usuario');
            }
            return response.json();
        } catch (error) {
            console.error("Error al actualizar el rol del usuario:", error);
        }
    };

    // Valor proporcionado al Provider
    const value = {
        newProduct,
        setNewProduct,
        products,
        setProducts,
        agregarProducto,
        usuario,
        iniciarSesion,
        cerrarSesion,
        categorias,
        setCategorias,
        actualizarRolUsuario,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};







  // const cerrarSesion = () => {
  //   setUsuario(null);
  //   localStorage.removeItem('usuario');
  // };
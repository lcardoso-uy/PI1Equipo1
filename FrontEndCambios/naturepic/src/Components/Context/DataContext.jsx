import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    image_url: '',
    category: '',
  });
  


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



  useEffect(() => {

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }

    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products:", err));


      
    fetch("http://localhost:8080/products/random")
      .then(res => res.json())
      .then(data => setRandomProducts(data))
      .catch(err => console.error("Failed to fetch random products:", err));



      fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(data => {
        setCategorias(data);
        console.log("Categorías cargadas:", data);
      })
      .catch(err => console.error("Failed to fetch categories:", err));
  }, []);
  

  const iniciarSesion = (usuario) => {
    setUsuario(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  const value = {
    newProduct,
    setNewProduct,
    products,
    setProducts,
    agregarProducto,
    randomProducts,
    usuario,
    iniciarSesion,
    cerrarSesion,
    categorias,
    setCategorias,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
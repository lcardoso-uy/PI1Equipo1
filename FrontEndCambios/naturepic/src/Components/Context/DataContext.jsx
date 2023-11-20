import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [categorias, setCategorias] = useState([]);
  
  const agregarCategoria = (categoria) => {
    setCategorias((prevCategorias) => [...prevCategorias, categoria]);
  };



  useEffect(() => {

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }

    fetch("http://3.139.238.255:8080/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products:", err));

    fetch("http://3.139.238.255:8080/products/random")
      .then(res => res.json())
      .then(data => setRandomProducts(data))
      .catch(err => console.error("Failed to fetch random products:", err));

    fetch("http://3.139.238.255:8080/categories/")
    .then(res => res.json())
    .then(data => setCategorias(data))
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
    products,
    setProducts,
    randomProducts,
    categorias,
    setCategorias,
    usuario,
    iniciarSesion,
    cerrarSesion,
    categorias,
    setCategorias,
    agregarCategoria
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

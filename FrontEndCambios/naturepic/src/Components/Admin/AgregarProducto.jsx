import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import './Admin.css';
import AgregarCategoria from './AgregarCategoria';

function AgregarProducto() {
  const { setProducts } = useContext(DataContext);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', image: '' });

  const handleChange = (e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts(products => [...products, { ...newProduct, id: Date.now().toString() }]);
    setNewProduct({ name: '', description: '', image: '' });
  };

  return (
    <div className="agregar-producto-form">
      <form onSubmit={handleSubmit}>
        <label>Nombre:<input type="text" name="name" value={newProduct.name} onChange={handleChange} required /></label>
        <br />
        <label>Descripción:<textarea name="description" value={newProduct.description} onChange={handleChange} required /></label>
        <br />
        <label>Imagen URL:<input type="text" name="image" value={newProduct.image} onChange={handleChange} required /></label>
        <br />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}


export default AgregarProducto;
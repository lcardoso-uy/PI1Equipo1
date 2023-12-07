import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import './Admin.css';
import { AuthContext } from '../Context/AuthContext';

function AgregarProducto() {
  const { categorias } = useContext(DataContext)
  const { agregarProducto, setNewProduct, newProduct, products, setProducts } = useContext(AuthContext);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingProduct = products.find(product => product.name.toLowerCase() === newProduct.name.toLowerCase());
    if (existingProduct) {

      setErrorMessage('El nombre del producto ya está en uso.');
      return;
    }

    if (newProduct.name.trim() && selectedCategoryId) {
      const productToSubmit = {
        ...newProduct,
        category: { id: selectedCategoryId }
      };

      const addedProduct = await agregarProducto(productToSubmit);
      if (addedProduct) {
        setNewProduct({ name: '', description: '', image_url: '' });
        setProducts([...products, addedProduct]);
        setErrorMessage('');
      }
    }
  };

  return (
    <div className="agregar-producto-form">
      {errorMessage && <div className="error-message__AddProduct">{errorMessage}</div>} {/* Mostrar mensaje de error si existe */}
      <form onSubmit={handleSubmit}>
        <label>Nombre:
          <input type="text" name="name" value={newProduct.name} onChange={handleProductChange} required />
        </label>
        <br />
        <label>Descripción:
          <textarea name="description" value={newProduct.description} onChange={handleProductChange} required />
        </label>
        <br />
        <label>Imagen URL:
          <input type="text" name="image_url" value={newProduct.image_url} onChange={handleProductChange} required />
        </label>
        <br />
        <label>Categoría:
          <select
            name="category"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default AgregarProducto;
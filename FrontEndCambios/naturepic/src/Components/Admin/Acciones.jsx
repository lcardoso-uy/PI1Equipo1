import React, { useState, useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import './Admin.css';

const Acciones = ({ productId }) => {

    const [accionVisible, setAccionVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const { categorias, setProducts, products } = useContext(DataContext);
    const toggleAccion = () => {
      setAccionVisible(!accionVisible);
    };
    const accion1 = () => {
      alert("Realizando acción 1");
    };
  
    const agregarCategoriaAProducto = async () => {
      if (!selectedCategory) {
        alert('Por favor, selecciona una categoría.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/products/${productId}/category`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ categoryId: selectedCategory })
        });

        if (response.ok) {
          const updatedProduct = await response.json();
          setProducts(products.map(p => p.id === productId ? { ...p, category: updatedProduct.category } : p));
          alert('Categoría agregada con éxito.');
        } else {
          alert('Hubo un error al actualizar la categoría del producto.');
        }
      } catch (error) {
        console.error("Error al actualizar categoría del producto:", error);
      }
    };

    return (
        <div className="contenedor__acciones">
            <button className="boton__acciones" onClick={toggleAccion}>Acciones</button>
            {accionVisible && (
                <div className="contenedor__listaDeAcciones">
                    <div>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                          <option value="">Seleccione una categoría</option>
                          {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                              {categoria.name}
                            </option>
                          ))}
                        </select>
                        <button onClick={() => {
                          agregarCategoriaAProducto();
                          toggleAccion();
                        }}>Confirmar</button>
                      </div>
                </div>
            )}
        </div>
    );
};

export default Acciones;
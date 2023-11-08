import React, { useState, useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import './Admin.css';

const Acciones = ({ productId }) => {
    const [accion, setAccion] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const { categorias, setProducts, products } = useContext(DataContext);

    const toggleAccion = () => {
      setAccion(!accion);
    }
  
  
    const accion1 = () => {
      alert("Realizando acción 1");
    }
  
    const accion2 = () => {
      alert("Realizando acción 2");
    }
  
    const accion3 = () => {
      alert("Realizando acción 3");
    }

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
          // Actualiza el estado de los productos
          setProducts(products.map(p => p.id === productId ? updatedProduct : p));
          alert('Categoría agregada con éxito.');
        } else {
          alert('Hubo un error al actualizar la categoría del producto.');
        }
      } catch (error) {
        console.error("Error al actualizar categoría del producto:", error);
      }
    }

    return (
        <div className="contenedor__acciones">
            <button className="boton__acciones" onClick={toggleAccion}>Acciones</button>
            {accion && (
            <div className="contenedor__listaDeAcciones">
                <button onClick={accion1}>Eliminar Producto</button>
                <button onClick={accion2}>Administrar características</button>
                <button onClick={accion3}>Agregar Categoría</button>
                {/* {mostrarAgregarCategoria && (
                  <div>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                      <option value="">Seleccione una categoría</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.name}
                        </option>
                      ))}
                    </select>
                    <button onClick={agregarCategoriaAProducto}>Confirmar</button>
                  </div>
                )} */}
            </div>
            )}
        </div>
    )
}

export default Acciones;
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataContext'; // Asegúrate de que la ruta de importación es correcta

const BarraDeBusqueda = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const navigate = useNavigate();
  const { products } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar la lógica para encontrar el producto basándose en terminoBusqueda
    const productoEncontrado = products.find(product => product.name.toLowerCase() === terminoBusqueda.toLowerCase());
    
    // Si el producto existe, navegar a su detalle, de lo contrario, podrías mostrar un mensaje o navegar a una ruta de "producto no encontrado"
    if (productoEncontrado) {
      navigate(`/detalle/${productoEncontrado.id}`);
    } else {
      // Opcional: manejar el caso de que el producto no se encuentre
      console.log('Producto no encontrado');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
        placeholder="Buscar producto..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default BarraDeBusqueda;

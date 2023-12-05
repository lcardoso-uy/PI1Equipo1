import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import './Admin.css';
const AgregarCategoria = () => {
  const { agregarCategoria } = useContext(DataContext);
  const [nuevaCategoria, setNuevaCategoria] = useState('');

  const handleChange = (e) => {
    setNuevaCategoria(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevaCategoria.trim() !== '') {
      agregarCategoria(nuevaCategoria);
      setNuevaCategoria('');
    }
  };

  return (
    <div className="agregar-producto-form">
    <form onSubmit={handleSubmit}>
      <label>
        Nueva Categoría:
        <input type="text" value={nuevaCategoria} onChange={handleChange} />
      </label>
      <button type="submit">Agregar Categoría</button>
    </form>
    </div>
  );
};

export default AgregarCategoria;
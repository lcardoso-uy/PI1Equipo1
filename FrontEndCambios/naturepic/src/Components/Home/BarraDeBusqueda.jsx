import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import lupa from "../../../public/Vector.png"
const BarraDeBusqueda = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const navigate = useNavigate();
  const { products } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productoEncontrado = products.find(product => product.name.toLowerCase().includes(terminoBusqueda.toLowerCase()));
    
    if (productoEncontrado) {
      navigate(`/detalle/${productoEncontrado.id}`);
    } else {
      console.log('Producto no encontrado');
    }
  };


  return (
    <form className='serch__form' onSubmit={handleSubmit}>
        <input className='serchInput__form'
        type="text"
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
        placeholder="Buscar producto..."
      />
      <button className='form__button' type="submit"><img src={lupa} alt="Buscar producto..." /></button>
    </form>
  );
};

export default BarraDeBusqueda;

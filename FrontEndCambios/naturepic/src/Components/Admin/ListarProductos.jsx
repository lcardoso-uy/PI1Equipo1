import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import './Admin.css';
import Acciones from './Acciones';

function ListarProductos() {
  const { products } = useContext(DataContext);

  return (
    <div className="lista-productos">
      <ul>
        {products.map((product) => <li key={product.id}><span className='id__admin-panel'>{product.id}</span>{product.name}<span><Acciones/></span></li>)}
      </ul>
    </div>
  );
}

export default ListarProductos;
import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import './Admin.css';

function ListarProductos() {
  const { products } = useContext(DataContext);

  return (
    <div className="lista-productos">
      <ul>
        {products.map(product => <li key={product.id}>{product.name}</li>)}
      </ul>
    </div>
  );
}

export default ListarProductos;
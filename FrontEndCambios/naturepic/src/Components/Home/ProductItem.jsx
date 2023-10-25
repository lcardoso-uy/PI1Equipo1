import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
    <div>
      <img src={product.images[0]} alt={product.name}/>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <Link to={`/detalle/${product.id}`}>Ver Detalles</Link>
    </div>
  );
};

export default ProductItem;
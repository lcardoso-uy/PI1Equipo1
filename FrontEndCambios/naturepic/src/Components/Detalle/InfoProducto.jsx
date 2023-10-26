import React from 'react';
import './Detalle.css';

const InfoProducto = ({ product }) => {
  return (
    <div className="info-producto-container">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </div>
  );
};

export default InfoProducto;



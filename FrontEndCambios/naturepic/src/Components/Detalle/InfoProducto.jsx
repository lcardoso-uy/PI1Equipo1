import React from 'react';
import './Detalle.css';

const InfoProducto = ({ product }) => {

  return (
    <div className="info-producto-container">
      <h2>{product.name}</h2>
      <div className="imagen-y-boton-container">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={`Imagen de ${product.name}`}
            className="product-image"
          />
        )}
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default InfoProducto;

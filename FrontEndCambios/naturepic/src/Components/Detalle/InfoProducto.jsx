// InfoProducto.jsx
import React from 'react';
import './Detalle.css';

const InfoProducto = ({ product }) => {
  const descripcionHardcodeada = "Esta es una descripción genérica que aparecerá en todos los productos. Puede contener información sobre el producto, detalles de fabricación, instrucciones de uso, y otros datos relevantes para el consumidor.";

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
        <p>{descripcionHardcodeada}</p>
      </div>
    </div>
  );
};

export default InfoProducto;

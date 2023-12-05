import React from 'react'

const ProductosBuscados = ({product}) => {
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
      </div>
    </div>

  )
}

export default ProductosBuscados
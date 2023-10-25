import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import InfoProducto from './InfoProducto';
import Galeria from './Galeria';

const Detalle = () => {
  const { productId } = useParams();
  const products = useContext(DataContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {

    const selectedProduct = products.find(p => p.id === productId);

    if (selectedProduct) {
      setProduct(selectedProduct);
    }
    
  }, [productId, products]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Detalle del Producto</h1>
      <InfoProducto product={product} />
      <Galeria images={product.images} />
    </div>
  );
};

export default Detalle;
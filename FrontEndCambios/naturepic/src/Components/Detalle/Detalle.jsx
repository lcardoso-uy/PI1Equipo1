import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import InfoProducto from './InfoProducto';
import './Detalle.css';

const Detalle = () => {
  const { productId } = useParams();
  const { products } = useContext(DataContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const selectedProduct = products.find(p => p.id === parseInt(productId));
    setProduct(selectedProduct || null);
  }, [productId, products]);

  if (!product) return <p>Cargando...</p>;

  return (
  <div>
    <br /><br />
    <div className="detalle-container">
      <h1>Detalle del Producto</h1>
      <InfoProducto product={product} />
      <Link to={`/galeria/${product.id}`}>
      <button className="ver-mas">Ver más</button>
      </Link>

    </div>
    </div>
  );
};

export default Detalle;
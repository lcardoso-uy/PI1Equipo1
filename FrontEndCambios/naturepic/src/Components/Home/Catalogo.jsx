import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';

const Catalogo = () => {
  const { products } = useContext(DataContext);

  return (
    <div>
      <br />
      <br />
      <h1>Catálogo de Productos</h1>
      <div className="product-container">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <Link to={`/detalle/${product.id}`}>
              <p>{product.name}</p>              
              <img src={product.image} alt={product.name} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;

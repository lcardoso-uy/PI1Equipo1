import React from 'react';
import ProductList from './ProductList';
import Recommendations from './Recommendations';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a nuestra tienda</h1>
      <ProductList />
      <Recommendations />
    </div>
  );
};

export default Home;
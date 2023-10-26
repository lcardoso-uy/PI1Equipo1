import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import './Home.css';

const Home = () => {
  const { randomProducts } = useContext(DataContext);

  return (
    <div>
      <h1>Tu aventura fotográfica comienza aquí</h1>
      <div className="product-container">
        {randomProducts.map(product => (
          <div key={product.id} className="product-item">
          <p>{product.name}</p>
            <img src={product.image} alt={product.name} />
          </div>
        ))}
      </div>
      <Link to="/catalogo">
        <button>Ver Productos</button>
      </Link>
    </div>
  );
};

export default Home;




// import React from 'react';
// import ProductList from './ProductList';
// import Recommendations from './Recommendations';

// const Home = () => {
//   return (
//     <div className='h1-home'>
//       <h1>Tu aventura fotográfica comienza aquí</h1>
//       <ProductList />
//       <Recommendations />
//     </div>
//   );
// };

// export default Home;
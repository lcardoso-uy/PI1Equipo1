import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import './Home.css';
import imgenDestacada from "../../../public/Imagen Principal 1.png";
const Home = () => {
  const { randomProducts } = useContext(DataContext);
  const {categorias} = useContext(DataContext)
  // const {products} = useContext(DataContext)
  return (
    <div className='home-container'>
      {/* Tu aventura fotográfica comienza aquí */}
      <h1>Explora la naturaleza en detalle</h1>
      <img className='imagen-destacada' src={imgenDestacada} alt="imagen-destacada" />
      <br />
      <div className="categories-container">
        {categorias.map(categoria => (
          <div key={categoria.id} className="categorie-item">
          <div className='img-container-categories'>
            <img src={categoria.image_url} alt={categoria.name} />
            <p>{categoria.name}</p>
          </div>
          </div>
        ))}
      </div>
      <br />
      <div className="Productos-random-contenedor">
        {randomProducts.map(product => (
          <div key={product.id} className="product-item">
          <p>{product.name}</p>
            <img src={product.image_url} alt={product.name} />
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
      {/* <div>
        {products.map(product => (
          <div key={product.id} className="product-item">
          <p>{product.name}</p>
            <img src={product.images} alt={product.name} />
          </div>
        ))}
      </div> */}



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
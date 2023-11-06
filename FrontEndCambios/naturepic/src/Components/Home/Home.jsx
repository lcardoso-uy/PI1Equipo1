import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import BarraDeBusqueda from './BarraDeBusqueda'; // Asegúrate de que la ruta de importación es correcta
import './Home.css';
import imagenDestacada from "../../../public/Imagen Principal 1.png";

const Home = () => {
  const { randomProducts, categorias } = useContext(DataContext);

  return (
    <div className='home-container'>
        <h1>Explora la Naturaleza en Detalle</h1>
      <div className="header-content">
        <p>Descubre nuestro arsenal de equipos fotográficos para capturar la vida salvaje como nunca antes</p>
        <BarraDeBusqueda />
      </div>
      <img className='imagen-destacada' src={imagenDestacada} alt="imagen destacada" />
      {/* <BarraDeBusqueda /> */}
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
    </div>
  );
};

export default Home;

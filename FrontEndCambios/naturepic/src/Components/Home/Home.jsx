import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import './Home.css';
import imagenDestacada from "../../../public/Imagen Principal 1.png";
import BarraDeBusquedaUnificada from './BarraDeBusquedaUnificada';

const Home = () => {
  const { products, categorias } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;


  const pageCount = Math.ceil(products.length / productsPerPage);


  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < pageCount ? prev + 1 : prev));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className='home-contenedorPrincipal'>
      <h1>Explora la Naturaleza en Detalle</h1>
      <div className="home-content">
        <p>Descubre nuestro arsenal de equipos fotográficos para capturar la vida salvaje como nunca antes</p>
        <div className='contenedor__BarrasDeBusqueda__Home'>
        <BarraDeBusquedaUnificada/>
        </div>
      </div>
      <img className='imagen-destacada' src={imagenDestacada} alt="imagen destacada" />
      
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
      
      {/* Listado de productos */}
      <div className="Productos-random-contenedor">
        {currentProducts.map(product => (
          <div key={product.id} className="product-item">
            <p>{product.name}</p>
            <img src={product.image_url} alt={product.name} />
          </div>
        ))}
      </div>

      {/* Controles de Paginación */}

      <div className="pagination-controls">
        <button onClick={goToFirstPage}>
          Inicio
        </button>
        <span>Página {currentPage} de {pageCount}</span>
        <button onClick={goToNextPage} disabled={currentPage === pageCount}>
          Siguiente
        </button>
      </div>
    </div>
    
  );
};

export default Home;

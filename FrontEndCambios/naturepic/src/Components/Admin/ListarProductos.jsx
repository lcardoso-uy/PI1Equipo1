import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import { Link } from 'react-router-dom';
import './Admin.css';
import Acciones from './Acciones';

function ListarProductos() {
  const { products } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  
   // Ordenar productos por 'id' de menor a mayor
   const sortedProducts = [...products].sort((a, b) => a.id - b.id);

  // Obtener los productos actuales
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Números totales de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="lista-productos">
      <ul>
        {currentProducts.map((product) => (
          <li key={product.id}>
            <span className='id__admin-panel'>{product.id}</span>
            <span className="product-name">{product.name}</span>
            <span className="category">{product.category ? product.category.name : 'Sin categoría'}</span>
            <span><Acciones/></span>
          </li>
        ))}
      </ul>
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <Link to="#!" onClick={() => paginate(number)} className='page-link'>
                {number}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default ListarProductos;

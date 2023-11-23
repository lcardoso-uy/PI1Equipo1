// Detalle.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import InfoProducto from './InfoProducto';
import './Detalle.css';

const Detalle = () => {
  const { productId } = useParams();
  const { products } = useContext(DataContext);
  const [product, setProduct] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState([]);

  useEffect(() => {
    const selectedProduct = products.find(p => p.id === parseInt(productId));
    setProduct(selectedProduct || null);

    // Cargar disponibilidad
    const cargarDisponibilidad = async () => {
      try {
        // Ajusta las fechas según sea necesario
        const fechaInicio = "2023-11-15";
        const fechaFin = "2023-11-30";
        const response = await fetch(`{{env}}/product-calendar/calendar/${productId}?start=${fechaInicio}&end=${fechaFin}`);
        if (response.ok) {
          const data = await response.json();
          setDisponibilidad(data);
        }
      } catch (error) {
        console.error('Error al cargar la disponibilidad:', error);
      }
    };

    cargarDisponibilidad();
  }, [productId, products]);

  const mostrarDisponibilidad = () => {
    return disponibilidad.map((item, index) => (
      <div key={index}>
        <span>{item.date}: </span>
        <span>{item.status}</span>
      </div>
    ));
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div>
      <br /><br />
      <div className="detalle-container">
        <InfoProducto product={product} />
        <div className="disponibilidad-container">
          <h3>Disponibilidad:</h3>
          {mostrarDisponibilidad()}
        </div>
        <Link to={`/galeria/${product.id}`}>
          <button className="ver-mas">Ver más</button>
        </Link>
      </div>
    </div>
  );
};

export default Detalle;


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { DataContext } from '../Context/DataContext';
// import InfoProducto from './InfoProducto';
// import './Detalle.css';

// const Detalle = () => {
//   const { productId } = useParams();
//   const { products } = useContext(DataContext);
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const selectedProduct = products.find(p => p.id === parseInt(productId));
//     setProduct(selectedProduct || null);
//   }, [productId, products]);

//   if (!product) return <p>Cargando...</p>;

//   return (
//     <div>
//       <br /><br />
//       <div className="detalle-container">
//         <InfoProducto product={product} />
//         <Link to={`/galeria/${product.id}`}>
//           <button className="ver-mas">Ver más</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Detalle;

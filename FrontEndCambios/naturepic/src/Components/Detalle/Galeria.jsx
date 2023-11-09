import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import './Detalle.css';

const Galeria = () => {
  const { productId } = useParams();
  const { products } = useContext(DataContext);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const product = products.find(p => p.id === parseInt(productId));
    if (product && product.images) {
      setImages(product.images.slice(0, 5));
    }
  }, [productId, products]);


  if (images.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="galeria-container">
      {/* Contenedor de la imagen principal */}
      <div className="galeria-main">
        <img src={images[0]?.image_url} alt="Imagen principal" />
      </div>

      {/* Contenedor de las imágenes secundarias */}
      <div className="galeria-secondary-container">
        {images.slice(1).map((image, index) => (
          <div className="galeria-secondary" key={index}>
            <img src={image.image_url} alt={`Imagen secundaria ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeria;

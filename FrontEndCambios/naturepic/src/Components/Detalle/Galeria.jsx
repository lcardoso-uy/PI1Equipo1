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

  return (
    <div>
      <h1>Galería de Imágenes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img src={image.image_url} alt={`Imagen ${index + 1}`} style={{ width: '100px', height: '100px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeria;
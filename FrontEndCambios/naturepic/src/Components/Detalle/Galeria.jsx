import React from 'react';

const Galeria = ({ images }) => {
  return (
    <div>
      <h3>Galería de Imágenes</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img src={image} alt={`Imagen ${index + 1}`} style={{ width: '100px', height: '100px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeria;
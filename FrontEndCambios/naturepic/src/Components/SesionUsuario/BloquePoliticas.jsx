import React, { useState, useEffect } from 'react';

const BloquePoliticas = () => {
  const [politicas, setPoliticas] = useState([]);

  useEffect(() => {
    setPoliticas([
      { titulo: "Política 1", descripcion: "Descripción de la política 1..." },
      { titulo: "Política 2", descripcion: "Descripción de la política 2..." },
      // ...
    ]);
  }, []);

  return (
    <div className="bloque-politicas">
      <h2 className="titulo-politicas">Políticas de Uso</h2>
      <div className="contenedor-politicas">
        {politicas.map((politica, index) => (
          <div key={index} className="politica">
            <h3>{politica.titulo}</h3>
            <p>{politica.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloquePoliticas;

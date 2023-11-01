import React, { useState } from 'react';

const Acciones = () => {
    const [accion, setAccion] = useState(false);

    const toggleAccion = () => {
      setAccion(!accion);
    }
  
    const accion1 = () => {
      alert("Realizando acción 1");
    }
  
    const accion2 = () => {
      alert("Realizando acción 2");
    }
  
    const accion3 = () => {
      alert("Realizando acción 3");
    }

    return (
        <div className="dropdown">
            <button className="dropbtn" onClick={toggleAccion}>Acciones</button>
            {accion && (
            <div className="dropdown-content">
                <button onClick={accion1} className='delete-button'>Eliminar Producto</button>
                <button onClick={accion2}>Administrar características</button>
                <button onClick={accion3}>Agregar Categoría</button>
            </div>
            )}
        </div>
    )
}

export default Acciones;

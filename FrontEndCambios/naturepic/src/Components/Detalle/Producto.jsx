import React from 'react';
import { useNavigate } from 'react-router-dom';

const Producto = ({ producto }) => {
    const navigate = useNavigate();

    const irADetalle = () => {
        navigate(`/detalle/${producto.id}`);
    };

    return (
        <div onClick={irADetalle} style={{ cursor: 'pointer' }}>
            <img src={producto.image_url} alt={producto.name} />
            <h3>{producto.name}</h3>
            <p>{producto.description}</p>
        </div>
    );
};

export default Producto;

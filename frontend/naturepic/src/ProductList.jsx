import React, { useContext } from 'react';
import { DataContext } from './DataStore.jsx';

const ProductList = () => {
    const products = useContext(DataContext);

    return (
        <div>
            {products.map(product => (
                <div key={product.id} className="product">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    {product.images.map((img, index) => (
                        <img key={index} src={img} alt={product.name} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ProductList;
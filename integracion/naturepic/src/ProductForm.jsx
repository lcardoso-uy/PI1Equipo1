import React, { useContext, useState } from 'react';
import { DataContext } from './DataStore.jsx';
import ProductForm from './ProductForm'; 

const ProductList = () => {
    const products = useContext(DataContext);

    // State to manage form visibility
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            {/* Button to toggle the product form visibility */}
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add Product'}
            </button>

            {/* Conditionally render the ProductForm */}
            {showForm && <ProductForm />}

            {products.map(product => (
                <div key={product.id} className="product">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    {product.images && product.images.map((img, index) => (
                        <img key={index} src={img} alt={product.name} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ProductList;

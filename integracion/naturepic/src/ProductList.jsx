import React, { useContext, useState } from 'react';
import { DataContext } from './DataStore.jsx';
import ProductForm from './ProductForm';

const ProductList = () => {
    const products = useContext(DataContext);
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

    const handleAddProduct = () => {
        setShowForm(true); // Show the product form when button is clicked
    }

    return (
        <div>
            {/* Conditional rendering of the form */}
            {showForm ? (
                <>
                    <ProductForm />
                    <button onClick={() => setShowForm(false)}>Close Form</button>
                </>
            ) : (
                <button onClick={handleAddProduct}>Add Product</button>
            )}
            
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

{/*import React, { useContext } from 'react';
import { DataContext } from './DataStore.jsx';
import ProductForm from './ProductForm'; 

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

export default ProductList;*/}
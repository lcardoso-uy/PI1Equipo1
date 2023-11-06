import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../Context/DataContext';
import './Admin.css';

function AgregarProducto() {
  const { agregarProducto, setNewProduct, newProduct, products, setProducts, categorias } = useContext(DataContext);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newProduct.name.trim() && selectedCategoryId) {
      const productToSubmit = {
        ...newProduct,
        category: { id: selectedCategoryId }
      };

      const addedProduct = await agregarProducto(productToSubmit);
      if (addedProduct) {
        setNewProduct({ name: '', description: '', image_url: '' });
        setProducts([...products, addedProduct]);
      }
    }
  };

  return (
    <div className="agregar-producto-form">
      <form onSubmit={handleSubmit}>
        <label>Nombre:
          <input type="text" name="name" value={newProduct.name} onChange={handleProductChange} required />
        </label>
        <br />
        <label>Descripción:
          <textarea name="description" value={newProduct.description} onChange={handleProductChange} required />
        </label>
        <br />
        <label>Imagen URL:
          <input type="text" name="image_url" value={newProduct.image_url} onChange={handleProductChange} required />
        </label>
        <br />
        <label>Categoría:
          <select
            name="category"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default AgregarProducto;


















// import React, { useContext, useState } from 'react';
// import { DataContext } from '../Context/DataContext';
// import './Admin.css';

// function AgregarProducto() {
//   const { agregarProducto, agregarCategoria, newProduct, setNewProduct } = useContext(DataContext);
//   const [newCategoryName, setNewCategoryName] = useState('');

//   const handleProductChange = (e) => {
//     setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
//   };

//   const handleCategoryChange = (e) => {
//     setNewCategoryName(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let categoryToUse;

//     if (newCategoryName.trim()) {
//       const newCategory = await agregarCategoria(newCategoryName);
//       if(newCategory) {
//         categoryToUse = newCategory.id;
//       }
//     }

//     if (newProduct.name.trim() && categoryToUse) {
//       const productToSubmit = {
//         ...newProduct,
//         category: { id: categoryToUse }
//       };
      
//       await agregarProducto(productToSubmit);
//       setNewProduct({ name: '', description: '', image_url: '' });
//       setNewCategoryName('');
//     }
//   };

//   return (
//     <div className="agregar-producto-form">
//       <form onSubmit={handleSubmit}>
//         <label>Nombre:
//           <input type="text" name="name" value={newProduct.name} onChange={handleProductChange} required />
//         </label>
//         <br />
//         <label>Descripción:
//           <textarea name="description" value={newProduct.description} onChange={handleProductChange} required />
//         </label>
//         <br />
//         <label>Imagen URL:
//           <input type="text" name="image_url" value={newProduct.image_url} onChange={handleProductChange} required />
//         </label>
//         <br />
//         <label>Nueva Categoría:
//           <input type="text" value={newCategoryName} onChange={handleCategoryChange} required />
//         </label>
//         <br />
//         <button type="submit">Agregar Producto</button>
//       </form>
//     </div>
//   );
// }

// export default AgregarProducto;


























// import React, { useContext, useState } from 'react';
// import { DataContext } from '../Context/DataContext';
// import './Admin.css';

// function AgregarProducto() {
//   const { setProducts, agregarCategoria, categorias } = useContext(DataContext);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     description: '',
//     image: '',
//     category: ''
//   });
//   const [newCategory, setNewCategory] = useState('');

//   const handleProductChange = (e) => {
//     setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
//   };

//   const handleCategoryChange = (e) => {
//     setNewCategory(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (newCategory.trim()) {
//       await agregarCategoria({ name: newCategory, status: true });
//       setNewCategory('');
//     }

//     if (newProduct.name.trim() && newProduct.category.trim()) {
//       setProducts((products) => [...products, { ...newProduct, id: Date.now().toString() }]);
//       setNewProduct({ name: '', description: '', image: '', category: '' });
//     }
//   };

//   return (
//     <div className="agregar-producto-form">
//       <form onSubmit={handleSubmit}>
//         <label>Nombre:
//           <input type="text" name="name" value={newProduct.name} onChange={handleProductChange} required />
//         </label>
//         <br />
//         <label>Descripción:
//           <textarea name="description" value={newProduct.description} onChange={handleProductChange} required />
//         </label>
//         <br />
//         <label>Imagen URL:
//           <input type="text" name="image" value={newProduct.image} onChange={handleProductChange} required />
//         </label>
//         <br />
//         <label>Categoría Existente:
//           <select name="category" value={newProduct.category} onChange={handleProductChange} required>
//             <option value="">Seleccione una categoría</option>
//             {categorias.map((categoria) => (
//               <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
//             ))}
//           </select>
//         </label>
//         <br />
//         <label>Nueva Categoría:
//           <input type="text" value={newCategory} onChange={handleCategoryChange} />
//         </label>
//         <br />
//         <button type="submit">Agregar Producto y Categoría</button>
//       </form>
//     </div>
//   );
// }

// export default AgregarProducto;

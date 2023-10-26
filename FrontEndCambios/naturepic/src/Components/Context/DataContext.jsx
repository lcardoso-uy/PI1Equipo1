import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products:", err));

    fetch("http://localhost:8080/products/random")
      .then(res => res.json())
      .then(data => setRandomProducts(data))
      .catch(err => console.error("Failed to fetch random products:", err));
  }, []);

  const value = {
    products,
    setProducts,
    randomProducts
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};




// import React, { createContext, useState, useEffect } from 'react';

// export const DataContext = createContext();

// export const DataProvider = ({ children }) => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         fetch("http://localhost:8080/products")
//             .then(res => res.json())
//             .then(setProducts)
//             .catch(err => console.error("Failed to fetch products:", err));
//     }, []);

//     return (
//         <DataContext.Provider value={{ products, setProducts }}>
//             {children}
//         </DataContext.Provider>
//     );
// };

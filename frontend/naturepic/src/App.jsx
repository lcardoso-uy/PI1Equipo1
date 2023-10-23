import React from 'react';
import { DataProvider } from './DataStore.jsx';
import ProductList from './ProductList.jsx';
import './index.css'

function App() {
  return (
    <DataProvider>
      <div className="App">
        <h1>Products</h1>
        <ProductList />
      </div>
    </DataProvider>
  );
}

export default App;

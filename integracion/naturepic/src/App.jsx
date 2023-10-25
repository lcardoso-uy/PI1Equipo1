import React from 'react';
import { DataProvider } from './DataStore.jsx';
import ProductList from './ProductList.jsx';
import './index.css'
import Header from './components/Header';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Header />
        <h1>Products</h1>
        <ProductList />
      </div>
    </DataProvider>
  );
}

export default App;

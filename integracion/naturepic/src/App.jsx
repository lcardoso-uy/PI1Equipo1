import React from 'react';
import { DataProvider } from './DataStore.jsx';
import ProductList from './ProductList.jsx';
import './index.css'
import Header from './components/Header';
import Login from './components/Login.jsx'

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Header />
        <h1>Iniciar Sesión</h1>
        <Login />
        <h1>Products</h1>
        <ProductList />
      </div>
    </DataProvider>
  );
}

export default App;

import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Detalle from './Components/Detalle/Detalle';
import Footer from './Components/Footer/Footer';
import Admin from './Components/Admin/Admin';
import AgregarProducto from './Components/Admin/AgregarProducto';
import ListarProductos from './Components/Admin/ListarProductos';
import { DataProvider } from './Components/Context/DataContext';
import Catalogo from './Components/Home/Catalogo';
import Galeria from './Components/Detalle/Galeria';

function App() {
  return (
    <>
      <Header />
      <DataProvider>
        <div className='main-content'>
          <Routes>
            {/* Home routes */}
            <Route path='/' element={<Home />} />
            <Route path='/detalle/:productId' element={<Detalle />} />
            <Route path='/catalogo' element={<Catalogo />} />
            <Route path='/galeria/:productId' element={<Galeria />} />
            {/* Admin routes */}
            <Route path='/admin' element={<Admin />}>
              <Route path='agregar-producto' element={<AgregarProducto />} />
              <Route path='lista-de-productos' element={<ListarProductos />} />
            </Route>
          </Routes>
        </div>
      </DataProvider>
      <Footer />
    </>
  );
}

export default App;

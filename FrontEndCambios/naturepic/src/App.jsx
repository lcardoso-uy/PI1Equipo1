import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Detalle from './Components/Detalle/Detalle';
import Footer from './Components/Footer/Footer';
import Galeria from './Components/Detalle/Galeria';
import RegistroUsuario from './Components/SesionUsuario/RegistroUsuario';
import IniciarSesion from './Components/SesionUsuario/IniciarSesion';
import AdminRoutes from './Components/Admin/AdminRoutes';

function App() {
  return (
    <>
        <Header />
        <div className='main-content'>
          <Routes>
          <Route path="/registro" element={<RegistroUsuario />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            {/* Home routes */}
            <Route path='/' element={<Home />} />
            <Route path='/detalle/:productId' element={<Detalle />} />
            <Route path='/galeria/:productId' element={<Galeria />} />
            {/* Admin routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </div>
      <Footer />
    </>
  );
}

export default App;
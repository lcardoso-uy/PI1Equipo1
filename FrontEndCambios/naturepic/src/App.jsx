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
import ListaProductos from './Components/Detalle/ListaProductos';
import FormularioReserva from './Components/FormularioReserva/FormularioReserva';
import ReservaExitosa from './Components/FormularioReserva/ReservaExitosa';

function App() {
  return (
    <>
        <Header />
        <div className='main-content'>
          <Routes>
          <Route path="/registro" element={<RegistroUsuario />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            {/* Rutas del Home */}
            <Route path='/' element={<Home />} />
            <Route path='/detalle/:productId' element={<Detalle />} />
            <Route path='/galeria/:productId' element={<Galeria />} />
            {/* Resultados de búsqueda para varios productos */}
          <Route path='/resultados' element={<ListaProductos />} />
            {/* Rutas del Panel de Administración */}
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path='/reserva' element={<FormularioReserva />} />
            <Route path='/reserva/exito' element={<ReservaExitosa />} />
          </Routes>
        </div>
      <Footer />
    </>
  );
}

export default App;
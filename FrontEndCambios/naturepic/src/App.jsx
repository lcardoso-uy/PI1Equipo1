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
import RegistroUsuario from './Components/SesionUsuario/RegistroUsuario';
import IniciarSesion from './Components/SesionUsuario/IniciarSesion';
import ListarUsuarios from './Components/Admin/ListarUsuarios';
function App() {
  return (
    <>

      <DataProvider>
        <Header />
        <div className='main-content'>
          <Routes>
          <Route path="/registro" element={<RegistroUsuario />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            {/* Home routes */}
            <Route path='/' element={<Home />} />
            <Route path='/detalle/:productId' element={<Detalle />} />
            <Route path='/galeria/:productId' element={<Galeria />} />
            <Route path='/catalogo' element={<Catalogo />} />

            {/* Admin routes */}
            <Route path='/admin' element={<Admin />}>
              <Route path='agregar-producto' element={<AgregarProducto />} />
              <Route path='lista-de-productos' element={<ListarProductos />} />
              <Route path='usuarios' element={<ListarUsuarios />} />
            </Route>
          </Routes>
        </div>
      </DataProvider>
      <Footer />
    </>
  );
}

export default App;
























// import React, { lazy, Suspense } from 'react';
// import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import Header from './Components/Header/Header';
// import Footer from './Components/Footer/Footer';
// import { DataProvider } from './Components/Context/DataContext';

// const Home = lazy(() => import('./Components/Home/Home'));
// const Detalle = lazy(() => import('./Components/Detalle/Detalle'));
// const Catalogo = lazy(() => import('./Components/Home/Catalogo'));
// const Galeria = lazy(() => import('./Components/Detalle/Galeria'));
// const Admin = lazy(() => import('./Components/Admin/Admin'));
// const AgregarProducto = lazy(() => import('./Components/Admin/AgregarProducto'));
// const ListarProductos = lazy(() => import('./Components/Admin/ListarProductos'));
// const AdminCategorias = lazy(() => import('./Components/Admin/AdminCategorias'));
// const RegistroUsuario = lazy(() => import('./Components/SesionUsuario/RegistroUsuario'));
// const IniciarSesion = lazy(() => import('./Components/SesionUsuario/IniciarSesion'));
// const NotFoundPage = lazy(() => import('./Components/NotFoundPage'));

// function App() {
//   return (
//     <>
//       <Header />
//       <DataProvider>
//         <div className='main-content'>
//           <Suspense fallback={<div>Cargando...</div>}>
//             <Routes>
//               <Route path='/usuario/registro' element={<RegistroUsuario/>}/>
//               <Route path='/usuario/ingreso' element={<IniciarSesion/>}/>
//               {/* Home routes */}
//               <Route path='/' element={<Home />} />
//               <Route path='/detalle/:productId' element={<Detalle />} />
//               <Route path='/catalogo' element={<Catalogo />} />
//               <Route path='/galeria/:productId' element={<Galeria />} />
//               {/* Admin routes */}
//               <Route path='/admin' element={<Admin />}>
//                 <Route path='agregar-producto' element={<AgregarProducto />} />
//                 <Route path='lista-de-productos' element={<ListarProductos />} />
//                 <Route path='categorias-admin' element= {<AdminCategorias/>}/>
//               </Route>
//               {/* 404 Not Found Page */}
//               <Route path="*" element={<NotFoundPage />} />
//             </Routes>
//           </Suspense>
//         </div>
//       </DataProvider>
//       <Footer />
//     </>
//   );
// }

// export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Pagina_1 from './Frontend_1/Pagina_Principal/Pagina_1';
import Component12 from './Frontend_2/Gestion_Contenido/gestion_contenido';
import RedesignedComponent from './Frontend_2/Seleccion_Contenido/seleccion_contenido';
import Valoracion from './Frontend_2/Valoracion_Contenido/valoracion_contenido';
import ProtectedRoute  from './ProtectedRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Pagina_1 />} />
        <Route path="/contenido" element={
          <ProtectedRoute>
            <Component12 />
          </ProtectedRoute>
        } />
        <Route path="/detalle" element={
          <ProtectedRoute>
            <RedesignedComponent />
          </ProtectedRoute>
        } />
        <Route path="/final" element={
          <ProtectedRoute>
            <Valoracion />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  </React.StrictMode>,
);
import React from 'react';
import ReactDOM from 'react-dom/client';


const SELECTED_COMPONENT = 3;

if (SELECTED_COMPONENT === 1) {
  import('./Frontend_1/Pagina_Principal/Pagina_1').then(module => {
    const Pagina_1 = module.default;
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Pagina_1 />
      </React.StrictMode>
    );
  });
} else if (SELECTED_COMPONENT === 2) {
  import('./Frontend_2/Gestion_Contenido/gestion_contenido').then(module => {
    const Component = module.default;
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Component />
      </React.StrictMode>
    );
  });
} else if (SELECTED_COMPONENT === 3) {
  import('./Frontend_2/Seleccion_Contenido/seleccion_contenido').then(module => {
    const RedesignedComponent = module.default;
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <RedesignedComponent />
      </React.StrictMode>
    );
  });
} else if (SELECTED_COMPONENT === 4) {
  import('./Frontend_2/Valoracion_Contenido/valoracion_contenido').then(module => {
    const Valoracion = module.default;
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Valoracion />
      </React.StrictMode>
    );
  });
} else {
  console.error('Componente no seleccionado. Por favor, elige un valor entre 1 y 4.');
}

/*import AudioPlayer from './Fronted_2/AudioPlayer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AudioPlayer />
  </React.StrictMode>
);
*/
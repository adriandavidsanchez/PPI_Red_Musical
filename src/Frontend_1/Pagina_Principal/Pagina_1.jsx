import React, { useState } from 'react';
import UserForm from '../section_start/Inicio1';
import './2Pagina_1.css';
import './Pagina_1.css';

function Pagina_1() {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');

  const toggleForm = (type) => {
    setFormType(type);
    setShowForm(true);
  }
  return (
    <div className="app-container-background">
      <header>
        <nav className="menu0">
        <a className="isotipo-container">
            <img className='isotipo0' src="src/assets/imagenes/isotipo.svg" alt="Isotipo" />
            <span className="isotipo1">Bad Melody</span>
          </a>
            <div className="menu1">
              <a ><span  style={{ color: '#007bff'}}>Plans</span></a>
              <a href="#ventajas" ><span  >Ventajas</span></a>
              <a href="#Musica" ><span >Musica</span></a>
            </div>
            <div className="button-container"><button className="rounded-button" onClick={() => toggleForm('login')}>
              <span className="menu">Iniciar sesión</span>
            </button>
            <button className="rounded-button1" onClick={() => toggleForm('register')}>
              <span className="menu">Registrarte</span>
            </button>
              </div>
        </nav>
        <section>
            <h2 className="titulo1">Explora Un Gran Universo Sonoro</h2>
        </section>
        <div className= "container">
        <section className="cuadros1">
          <p className="texto4">Descubre ritmos y sonidos que te harán vibrar y sentir la música como nunca antes.</p>
        </section>
        </div>
        <div>
          <svg className="offers-section-wave-bg" viewBox="0 0 1440 430" preserveAspectRatio="xMidYMax slice" >
            <g>
              <ellipse className="animate-1" cx="-.819" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-2" cx="61.855" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-3" cx="124.529" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-4" cx="187.201" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-5" cx="249.874" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-6" cx="312.546" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-1" cx="375.22" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-2" cx="437.892" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-3" cx="500.566" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-4" cx="563.238" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-5" cx="625.912" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-6" cx="688.585" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-1" cx="751.257" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-2" cx="813.931" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-3" cx="876.603" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-4" cx="939.277" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-5" cx="1001.95" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-6" cx="1064.62" cy="187.786" rx="48.836" ry="187.786" />
              <g className="animate-33">
              <text  className="letter" x="563.238" y="187.786" dominantBaseline="middle"textAnchor="middle" fill="white" style={{ fontSize: '80px' }}>d</text>
              </g>
              <g className="animate-44">
              <text  className="letter" x="437.892" y="187.786" dominantBaseline="middle"textAnchor="middle" fill="white" style={{ fontSize: '80px' }}>B</text>
              </g>
              <g className="animate-55">
              <text  className="letter" x="500.566" y="187.786" dominantBaseline="middle"textAnchor="middle" fill="white" style={{ fontSize: '80px' }}>a</text>
              </g>
              <g className="animate-66">
              </g>
              <g className="animate-11">
              <text  className="letter" x="678.585" y="187.786" dominantBaseline="middle"textAnchor="middle" fill="white" style={{ fontSize: '80px' }}>M</text>
              </g>
              <g className="animate-22">
              <text  className="letter" x="751.257" y="187.786" dominantBaseline="middle"textAnchor="middle" fill="white" style={{ fontSize: '80px' }}>e</text>
              </g>
              <g className="animate-33">
              <text  className="letter" x="813.931" y="187.786" dominantBaseline="middle"textAnchor="middle" fill="white" style={{ fontSize: '80px' }}>d</text>
              </g>
              <g className="animate-44">
              <text  className="letter" x="876.603" y="187.786" dominantBaseline="middle"textAnchor="middle" fill="white" style={{ fontSize: '80px' }}>o</text>
              </g>
              <g className="animate-55">
              <text  className="letter" x="939.277" y="187.786" dominantBaseline="middle"textAnchor="middle" fill="white" style={{ fontSize: '80px' }}>l</text>
              </g>
              <g className="animate-66">
              <text  className="letter"x="1001.95" y="187.786" dominantBaseline="middle"textAnchor="middle" fill="white" style={{ fontSize: '80px' }}>y</text>
              </g>
              <ellipse className="animate-1" cx="1127.29" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-2" cx="1189.97" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-3" cx="1252.64" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-4" cx="1315.31" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-5" cx="1377.99" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-6" cx="1440.66" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-1" cx="1503.33" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-2" cx="1.566" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-3" cx="1628.67" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-4" cx="1691.34" cy="187.786" rx="48.836" ry="187.786" />
              <ellipse className="animate-5" cx="1754.01" cy="187.786" rx="48.836" ry="187.786" />
            </g>
            
          </svg>
          <section id="Musica">
            <h2 className="titulo2" >¿Te Gusta La Variedad?</h2>
            <p className="texto3">Desde la suave melodía de una canción de cuna hasta el ritmo pulsante de una canción de rock. </p>
            <p className="texto3"> nuestra aplicación musical celebra la diversidad y riqueza
            de géneros que existen en el mundo de la música.</p>
            <div className="image-container">
              <img src="src/assets/imagenes/cuadros3.png" width="100%" height="100%" ></img>
            </div>
          </section>
          <section id="ventajas" >
            <h2 className="titulo2" style={{ marginTop: '105px', paddingTop: '40px' }}>Elige lo que escuchas.<p className="aux">Sin anuncios.</p></h2>
            <p className="texto3">Encuentra lo que quieras en nuestro catálogo de contenido de audio que nunca para de crecer. Explora los podcasts </p>
            <p className="texto3"> populares locales o revisa recomendaciones diarias en nuestra pestaña dedicada Podcasts.</p>
            <div className="image-container1">
              <img src="src/assets/imagenes/cuadros 22.png" width="100%" height="100%" ></img>
            </div>
          </section>
          <section id="ventajas1" className="mama" style={{ display: 'flex' }}>
            <div style={{width:'700px'}}>
            <h2 className="titulo2" style={{ marginTop: '70px'}}>¿No tienes internet? ¡No hay problema!</h2>
            <p className="texto3">Desde la suave melodía de una canción de cuna hasta el ritmo pulsante de una canción de rock. </p>
            <p className="texto3"> No queremos que nada se interponga entre tu experiencia de reproducción y tú. puedes llevar 
              su música y sus podcasts a donde quiera que vayan gracias a nuestra
              función de descarga, que también les ayuda a ahorrar datos.</p>
              </div>
              <div className="image-container2">
              <img src="src/assets/imagenes/cuadros44.jpg" ></img>
            </div>
          </section>
        </div>
      </header>
      <nav className="menu0"></nav>
      <footer className="menu2">
        <span className="texto5">
          <p>© 2023 Válvula Corporación. Reservados todos los derechos. Todas las marcas comerciales son propiedad de sus respectivos dueños en los EE. UU. y otros países.
            Todos los precios incluyen IVA (cuando corresponda)</p>
            Política de Privacidad   |   Información legal   |   Acuerdo de Suscriptor a Steam   |   Reembolsos   |   Cookie
        </span>
      </footer>
      {showForm  && (
        <div className="login-overlay">
          <UserForm onClose={() => setShowForm(false)} formType={formType} />
        </div>
      )}
    </div>
  );
};



export default Pagina_1;

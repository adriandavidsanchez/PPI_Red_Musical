import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import GenresCarousel from './Carrucel';
import './gestion_contenido.css';

export default function Component12() {
    return (
      <div className="container12">
        <header className="header12">
          <div className="logo-container12">
            <img className='isotipo12' src="src/assets/imagenes/isotipo.svg" alt="Isotipo" />
            <a style={{ alignItems: 'center' }} className="logo12">Bad Melody</a>
          </div>
          <nav className="nav12">
            <a href="#">Generos</a>
          </nav>
        </header>

        <main className="main12">
          <section className="featured-section12">
            <div className="featured-artists12">
              <div className="artists-grid12">
                <div className="artist12">
                  <h2 style={{ marginRight: '80px', marginBottom: '30px' }}>Featured Artists</h2>
                  <img src="/src/assets/imagenes/Gestion-prueva/dis2.jpg" alt="Artist Name" />
                  <h3>Artist Name</h3>
                  <p>Genre</p>
                </div>
                <div className="artist12" style={{ marginTop: '66px' }}>
                  <img style={{ paddingLeft: '30px' }} src="/src/assets/imagenes/Gestion-prueva/dis3.jpg" alt="Artist Name" />
                  <h3>Artist Name</h3>
                  <p>Genre</p>
                </div>
                <div className="new-releases12">
                  <h2 style={{ marginBottom: '30px' }}>New Releases</h2>
                  <div className="releases-list12">
                    <div style={{ display: 'flex', alignItems: 'center',marginBottom: '30px' }}>
                      <div>
                        <img className="Discos12" src="/src/assets/imagenes/Gestion-prueva/dis1.jpg" alt="Album Name" />
                      </div>
                      <div className="release12" style={{marginLeft: '20px'}}>
                        <h3>Album Name</h3>
                        <p>Artist Name - Genre</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div>
                        <img className="Discos12" src="/src/assets/imagenes/Gestion-prueva/dis4.jpg" alt="Album Name" />
                      </div>
                      <div className="release12"  style={{marginLeft: '20px'}}>
                        <h3>Album Name</h3>
                        <p>Artist Name - Genre</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <section className="genres-section12">
          <GenresCarousel />
        </section>
        <footer className="footer12">
          <span>🎶 Music Platform</span>
          <nav className="footer-nav12">
            <a href="#">Contact</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </nav>
        </footer>
      </div>
    );
}

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import GenresCarousel from './Carrucel';
import styles from './gestion_contenido.module.css'; // Asegúrate de que el nombre del archivo sea correcto

export default function Component12() {

  useEffect(() => {
    // Aplica los estilos al montar el componente
    document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';
    document.body.style.padding = '0px';
    // Limpia los estilos al desmontar el componente
  }, []);
    return (
      <div className={styles['container12']}>
        <header className={styles['header12']}>
          <div className={styles['logo-container12']}>
            <img className={styles['isotipo12']} src="src/assets/imagenes/isotipo.svg" alt="Isotipo" />
            <a style={{ alignItems: 'center' }} className={styles['logo12']}>Bad Melody</a>
          </div>
          <nav className={styles['nav12']}>
            <a href="#">Generos</a>
          </nav>
        </header>

        <main className={styles['main12']}>
          <section className={styles['featured-section12']}>
            <div className={styles['featured-artists12']}>
              <div className={styles['artists-grid12']}>
                <div className={styles['artist12']}>
                  <h2 style={{ marginRight: '80px', marginBottom: '30px' }}>Featured Artists</h2>
                  <img src="/src/assets/imagenes/Gestion-prueva/dis2.jpg" alt="Artist Name" />
                  <h3>{/* Aquí puedes poner el nombre del artista */}Artist Name</h3>
                  <p>Genre</p>
                </div>
                <div className={styles['artist12']} style={{ marginTop: '66px' }}>
                  <img style={{ paddingLeft: '30px' }} src="/src/assets/imagenes/Gestion-prueva/dis3.jpg" alt="Artist Name" />
                  <h3>{/* Aquí puedes poner el nombre del artista */}Artist Name</h3>
                  <p>Genre</p>
                </div>
                <div className={styles['new-releases12']}>
                  <h2 style={{ marginBottom: '30px' }}>New Releases</h2>
                  <div className={styles['releases-list12']}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                      <div>
                        <img className={styles['Discos12']} src="/src/assets/imagenes/Gestion-prueva/dis1.jpg" alt="Album Name" />
                      </div>
                      <div className={styles['release12']} style={{ marginLeft: '20px' }}>
                        <h3>Album Name</h3>
                        <p>Artist Name - Genre</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div>
                        <img className={styles['Discos12']} src="/src/assets/imagenes/Gestion-prueva/dis4.jpg" alt="Album Name" />
                      </div>
                      <div className={styles['release12']} style={{ marginLeft: '20px' }}>
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
        <section className={styles['genres-section12']}>
          <GenresCarousel />
        </section>
        <footer className={styles['footer12']}>
          <span>🎶 Music Platform</span>
          <nav className={styles['footer-nav12']}>
            <a href="#">Contact</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </nav>
        </footer>
      </div>
    );
}

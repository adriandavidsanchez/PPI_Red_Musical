import { getDownloadURL, getStorage, ref } from "firebase/storage";

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import GenresCarousel from './Carrucel';
import styles from './gestion_contenido.module.css';

const storage = getStorage();

export default function Component12() {
  useEffect(() => {
    
    document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';
    document.body.style.padding = '0px';
    
  }, []);

  const [UltimousuarioId, SetUltimousuarioId] = useState(null);
  const [UltimousuarioId2, SetUltimousuarioId2] = useState(null);

  const [imagenUsuario, SetimagenUsuario] = useState(null);
  const [nombreUsuario, SetnombreUsuario] = useState(null);
  const [GeneroUsuario, SetGeneroUsuario] = useState(null);

  const [imagenUsuario2, SetimagenUsuario2] = useState(null);
  const [nombreUsuario2, SetnombreUsuario2] = useState(null);
  const [GeneroUsuario2, SetGeneroUsuario2] = useState(null);

  const [fileUrl3, setFileUr3] = useState('');
  const [fileUrl4, setFileUr4] = useState('');


  const [ultimaCancionId, setUltimaCancionId] = useState(null);
  const [penultimaCancionId, setPenultimaCancionId] = useState(null);


  const [imagenCancion, SetimagenCancion] = useState(null);
  const [nombreArtista, SetnombreArtista] = useState(null);
  const [tituloCancion, SettituloCancion] = useState(null);
  const [GeneroCancion, SetGeneroCancion] = useState(null);

  const [imagenCancion2, SetimagenCancion2] = useState(null);
  const [nombreArtista2, SetnombreArtista2] = useState(null);
  const [tituloCancion2, SettituloCancion2] = useState(null);
  const [GeneroCancion2, SetGeneroCancion2] = useState(null);

  const [fileUrl, setFileUrl] = useState('');
  const [fileUrl2, setFileUrl2] = useState('');

  const obtenerUltimosusuarios = async () => {
    try {
      
      const response = await axios.get('http://localhost:8080/api/usuarios/ultimos-dos');
      const [id1, id2] = response.data;
      SetUltimousuarioId(id1);
      SetUltimousuarioId2(id2);
    } catch (error) {
      console.error('Error al obtener las últimas canciones:', error);
    }
  };

  const obtenerUsuario2 = async () => {
    if (UltimousuarioId) {
      try {
        const response = await axios.get(`/api/usuarios/${UltimousuarioId2}`);
        const usuario = response.data;
        SetnombreUsuario2(usuario.nombre);
        SetGeneroUsuario2(usuario.genero.nombreGenero);
        SetimagenUsuario2(usuario.imagenUsuario)
        
      } catch (error) {
        console.error('Error al obtener la canción:', error);
      }
    }
  };
  const obtenerUsuario1 = async () => {
    if (UltimousuarioId2) {
      try {
        const response = await axios.get(`/api/usuarios/${UltimousuarioId}`);
        const usuario = response.data;
        console.log("holaaa");
        SetnombreUsuario(usuario.nombre);
        SetGeneroUsuario(usuario.genero.nombreGenero);
        SetimagenUsuario(usuario.imagenUsuario)
      } catch (error) {
        console.error('Error al obtener la canción:', error);
      }
    }
  };


  useEffect(() => {
    const obtenerUltimasCanciones = async () => {
      try {
        
        const response = await axios.get('http://localhost:8080/api/canciones/ultimas-dos');
        const [id1, id2] = response.data;
        setUltimaCancionId(id1);
        setPenultimaCancionId(id2);
      } catch (error) {
        console.error('Error al obtener las últimas canciones:', error);
      }
    };


    const obtenerCancion2 = async () => {
      if (penultimaCancionId) {
        try {
          const response = await axios.get(`/api/canciones/${penultimaCancionId}`);
          const cancion = response.data;
          SettituloCancion2(cancion.tituloCancion);
          SetimagenCancion2(cancion.imagenCancion);
          SetnombreArtista2(cancion.artistaCancion.nombre);
          SetGeneroCancion2(cancion.generoCancion.nombreGenero)
        } catch (error) {
          console.error('Error al obtener la canción:', error);
        }
      }
    };

    const obtenerCancion1 = async () => {
      if (ultimaCancionId) {
        try {
          const response = await axios.get(`/api/canciones/${ultimaCancionId}`);
          const cancion = response.data;
          SettituloCancion(cancion.tituloCancion);
          SetimagenCancion(cancion.imagenCancion);
          SetnombreArtista(cancion.artistaCancion.nombre);
          SetGeneroCancion(cancion.generoCancion.nombreGenero)

        } catch (error) {
          console.error('Error al obtener la canción:', error);
        }
      }
    };
    

    obtenerUltimosusuarios();
    obtenerUltimasCanciones();
    obtenerUsuario1();
    obtenerUsuario2();
    obtenerCancion1();
    obtenerCancion2();
  }, [ultimaCancionId, penultimaCancionId, UltimousuarioId, UltimousuarioId2]);


  useEffect(() => {

    if (imagenUsuario && imagenUsuario2) {

      const fileRef1 = ref(storage, `Imagen/${imagenCancion}`);
      const fileRef2 = ref(storage, `Imagen/${imagenCancion2}`);
      const fileRef3 = ref(storage, `Imagen/${imagenUsuario}`);
      const fileRef4 = ref(storage, `Imagen/${imagenUsuario2}`);

      getDownloadURL(fileRef1).then((url) => {
        setFileUrl(url);
        console.log('URL de descarga imagen 1:', url);
      }).catch((error) => {
        console.error('Error al obtener la URL de descarga imagen 1:', error);
      });


      getDownloadURL(fileRef2).then((url2) => {
        setFileUrl2(url2);
        console.log('URL de descarga imagen 2:', url2);
      }).catch((error) => {
        console.error('Error al obtener la URL de descarga imagen 2:', error);
      });



      getDownloadURL(fileRef3).then((url3) => {
        setFileUr3(url3);
        console.log('URL de descarga imagen 1:', url3);
      }).catch((error) => {
        console.error('Error al obtener la URL de descarga imagen 1:', error);
      });

      getDownloadURL(fileRef4).then((url4) => {
        setFileUr4(url4);
        console.log('URL de descarga imagen 2:', url4);
      }).catch((error) => {
        console.error('Error al obtener la URL de descarga imagen 2:', error);
      });

    }
  }, [imagenCancion, imagenCancion2, imagenUsuario, imagenUsuario2]);



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
                <h2 style={{ marginRight: '80px', marginBottom: '30px'}}>Nuevos Artistas</h2>
                <img src={fileUrl3} style={{filter: "grayscale(60%)"}} alt="Artist Name" />
                <h3>{nombreUsuario}</h3>
                <p>{GeneroUsuario}</p>
              </div>
              <div className={styles['artist12']} style={{ marginTop: '66px' }}>
                <img style={{ paddingLeft: '30px',filter: "grayscale(60%)"}} src={fileUrl4} alt="Artist Name" />
                <h3>{nombreUsuario2}</h3>
                <p>{GeneroUsuario2}</p>
              </div>
              <div className={styles['new-releases12']}>
                <h2 style={{ marginBottom: '30px' }}>Nuevos Lanzamientos</h2>
                <div className={styles['releases-list12']}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                    <div>
                      <img className={styles['Discos12']} src={fileUrl2} alt="Album Name" />
                    </div>
                    <div className={styles['release12']} style={{ marginLeft: '20px' }}>
                      <h3>{tituloCancion2}</h3>
                      <p>{nombreArtista2} - {GeneroCancion2}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                      <img className={styles['Discos12']} src={fileUrl} alt="Album Name" />
                    </div>
                    <div className={styles['release12']} style={{ marginLeft: '20px' }}>
                      <h3>{tituloCancion}</h3>
                      <p>{nombreArtista} - {GeneroCancion}</p>
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

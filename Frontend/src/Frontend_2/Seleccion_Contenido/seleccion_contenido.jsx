import axios from 'axios';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTextoCompartidoAudio, textoCompartido } from '../../Variables.jsx';
import AudioPlayer from '../AudioPlayer';
import Opcion_Cantautor from './Opcion_Catautor';
import styles from './seleccion_contenido.module.css'; // Asegúrate de que el nombre del archivo sea correcto

const storage = getStorage();

const RedesignedComponent = () => {
    const genres = [
        'Rock', 'Salsa', 'Joropo', 'Pop', 'Jazz', 'Clásica', 'Reggaeton', 'Hip Hop', 'Tango', 'Electrónica', 'Personalizado'];
    const [canciones, setCanciones] = useState([]);
    const [cancionElegida, setcancionElegida] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    const [imagenUsuario, setImagenUsuario] = useState(null);

    const getGenreIndex = (genre) => {
        return genres.indexOf(genre);
    };

    // Ejemplo de uso
    const index = getGenreIndex(textoCompartido);
    console.log(index)

    useEffect(() => {
        axios.get(`http://localhost:8080/api/canciones/por-genero/${index + 1}`)
            .then(response => {
                setCanciones(response.data);
            })

            .catch(error => {
                console.error('Error al obtener las canciones:', error);
            });
    }, []);

    console.log(textoCompartido)



    const navigate = useNavigate();
    const AlbumClick = async (event) => {
        event.preventDefault(); // Esto previene el comportamiento predeterminado del clic, si existe alguno.
        console.log('hola'); // Este mensaje debería aparecer en la consola
        navigate('/final'); // Navegar a la ruta '/detalle'
    };

    const handleRowClick = (cancion) => {
        setcancionElegida(cancion);
        setTextoCompartidoAudio(cancion.audioCancion);
        setImagenUsuario(cancion.imagenCancion)
    };

    useEffect(() => {
        // Verifica que la imagen esté disponible
        if (imagenUsuario) {
            const fileRef = ref(storage, `Imagen/${imagenUsuario}`); // Cambia la ruta según corresponda

            getDownloadURL(fileRef)
                .then((url) => {
                    setFileUrl(url); // Guardar la URL de la imagen
                    console.log('URL de descarga de la imagen:', url);
                    console.log(fileUrl);
                })
                .catch((error) => {
                    console.error('Error al obtener la URL de descarga de la imagen:', error);
                });
        }
    }, [imagenUsuario]);

    return (

        <div>
            <div className={styles['container']}>
                <header>
                    <div className={styles['logo-container12']}>
                        <img className={styles['isotipo12']} src="/src/assets/imagenes/isotipo1.png" alt="Album Cover"></img>
                        <h1 style={{ alignItems: 'center' }} className={styles['logo12']}>Bad Melody - {textoCompartido}</h1>
                        <div className={styles['overlay']}>
                            <Opcion_Cantautor />
                        </div>
                    </div>
                </header>
                <div className={styles['main-content']}>
                    <div className={styles['playlist']}>
                        <h2>Playlist</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Song</th>
                                    <th style={{ paddingRight: '0px', paddingLeft: "0px" }}>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {canciones.map((cancion, index) => (
                                    <tr key={cancion.id} onClick={() => handleRowClick(cancion)} style={{ cursor: 'pointer' }}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div>{cancion.tituloCancion}</div>
                                            <div>{cancion.artistaCancion.nombre}</div> {/* Nombre del artista */}
                                        </td>
                                        <td>{cancion.fechaSubidaCancion[0] || 'Desconocida'}</td> {/* Si no hay duración, puedes poner 'N/A' */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {cancionElegida ? (
                            <div className={styles['now-playing']}>
                                <h2>Reproducción Actual</h2>
                                <div className={styles['now-playing-info']}>
                                    <div className={styles['album-cover1']} onClick={AlbumClick}>
                                        <img src={fileUrl} alt="Album Cover" ></img>
                                    </div>
                                    <div>
                                        <div>
                                            <h2>{cancionElegida.artistaCancion.nombre}</h2>
                                            <h3><b>{cancionElegida.tituloCancion}</b></h3>
                                            <p style={{ marginTop: "30px" }}><b>Lanzamiento:</b> 14 de septiembre, 2010</p>
                                            <p><b>Género:</b> {cancionElegida.generoCancion.nombreGenero}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <AudioPlayer />
                                </div>
                            </div>
                        ) : (
                            <h2>Selecciona Tu Experiencia...</h2>
                        )}
                    </div>

                    <div className={styles['album-details']}>
                        {cancionElegida ? (
                            <div>
                                <h2>Descripción</h2>
                                <div className={styles['related-albums']}>
                                    <div>
                                        <div className={styles['album-cover']} onClick={AlbumClick}>
                                            <img src={fileUrl} alt="Album Cover" />
                                        </div>
                                    </div>
                                </div>
                                <h3>{cancionElegida.artistaCancion.nombre}</h3>
                                <p>{cancionElegida.tituloCancion}</p>
                                <p>{cancionElegida.description}</p>
                            </div>
                        ) : (
                            <div>
                                <h2>Descripción</h2>
                                <div className={styles['related-albums']}>
                                    <div>
                                        <div className={styles['album-cover']} onClick={AlbumClick}>
                                            <img src="/src/assets/imagenes/Gestion-prueva/ImagenDisco.jpg" alt="Album Cover" />
                                        </div>
                                    </div>
                                </div>
                                <h4>Conoce</h4>
                                <p>Solo Para Curioso</p>
                                <p>Explora la historia y el sentimiento que se esconden detrás de esta melodía.
                                    Cada canción es un testimonio de la belleza y el poder de la música.</p>
                            </div>
                        )}
                        <h2>Album Details</h2>
                        <div>
                            <div style={{ display: 'flex' }}>
                                <div onClick={AlbumClick}>
                                    <img className={styles['Discos12']} src="/src/assets/imagenes/Gestion-prueva/dis6.jpg" alt="Album Name" />
                                    <p className={styles['texto5']}>Resistance</p>
                                    <p className={styles['texto6']}>Electrónica</p>
                                </div>
                                <div style={{ marginLeft: '20px' }} onClick={AlbumClick}>
                                    <img className={styles['Discos12']} src="/src/assets/imagenes/Gestion-prueva/dis7.jpg" alt="Album Name" />
                                    <p className={styles['texto5']}>Black Holes and Revelations</p>
                                    <p className={styles['texto6']}>Clásica</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div onClick={AlbumClick}>
                                    <img className={styles['Discos12']} src="/src/assets/imagenes/Gestion-prueva/dis8.jpg" alt="Album Name" />
                                    <p className={styles['texto5']}>Absolution</p>
                                    <p className={styles['texto6']}>Rock</p>
                                </div>
                                <div style={{ marginLeft: '20px' }} onClick={AlbumClick}>
                                    <img className={styles['Discos12']} src="/src/assets/imagenes/Gestion-prueva/dis9.jpg" alt="Album Name" />
                                    <p className={styles['texto5']}>Origin of Symmetry</p>
                                    <p className={styles['texto6']}>Pop</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RedesignedComponent;


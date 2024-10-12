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
    const [cancionesArtista, setCancionesArtista] = useState([]);

    const [fileUrlsImg, setFileUrlsImg] = useState([]);
    const [fileUrls, setFileUrls] = useState([]);

    const addUrl = (newUrl) => {
        setFileUrlsImg((prevUrls) => [...prevUrls, newUrl]);
    };

    useEffect(() => {
        const imagenCancion = cancionesArtista.map(cancion => cancion.imagenCancion);
        addUrl(imagenCancion);
    }, [cancionesArtista]);
    


    const getGenreIndex = (genre) => {
        return genres.indexOf(genre);
    };

    const index = getGenreIndex(textoCompartido);

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
        axios.get(`http://localhost:8080/api/canciones/artista/${cancion.artistaCancion.contacto}`)
            .then(response => {
                setCancionesArtista(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las canciones del artista:', error);
            });
    };

    useEffect(() => {
        const obtenerUrls = async () => {
            const cancionesConUrls = await Promise.all(cancionesArtista.map(async (cancion) => {
                const fileRef = ref(storage, `Imagen/${cancion.imagenCancion}`);
                try {
                    const url = await getDownloadURL(fileRef);
                    return { ...cancion, imageUrl: url };
                } catch (error) {
                    console.error('Error al obtener la URL de descarga de la imagen:', error);
                    return { ...cancion, imageUrl: null };
                }
            }));
            setCancionesArtista(cancionesConUrls);
        };
    
        if (cancionesArtista.length > 0) {
            obtenerUrls();
        }
    }, [cancionesArtista]);
    
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
                                    <th style={{ paddingRight: '0px', paddingLeft: "0px" }}>ㅤAño</th>
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
                        {cancionesArtista.length > 0 ? (
                            <div>
                                <h2>Canciones del mismo artista</h2>
                                <div className={styles['related-albums']}>
                                    {cancionesArtista.reduce((rows, cancion, index) => {
                                        if (index % 2 === 0) rows.push([]);
                                        rows[rows.length - 1].push(cancion);
                                        return rows;
                                    }, []).map((row, rowIndex) => (
                                        <div key={rowIndex} style={{ marginBottom: '20px' }}>
                                            {row.map((cancion, index) => (
                                                <div key={index}  onClick={AlbumClick}>
                                                    <img
                                                        className={styles['Discos12']}
                                                        src={cancion.imageUrl}
                                                        alt={cancion.tituloCancion}
                                                    />
                                                    <p className={styles['texto5']}>{cancion.tituloCancion}</p>
                                                    <p className={styles['texto6']}>{cancion.generoCancion.nombreGenero}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2>Selecciona una canción para ver más detalles</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RedesignedComponent;


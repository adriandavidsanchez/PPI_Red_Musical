import axios from 'axios';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioPlayer from '../AudioPlayer';
import Opcion_Cantautor from './Opcion_Catautor';
import styles from './seleccion_contenido.module.css';
import FavoriteButton from './FavoriteButton';

// Inicialización del almacenamiento
const almacenamiento = getStorage();

const RedesignedComponent = () => {
    // Constantes y estados
    const generos = ['Rock', 'Salsa', 'Joropo', 'Pop', 'Jazz', 'Clásica', 'Reggaeton', 'Hip Hop', 'Tango', 'Electrónica', 'Personalizado'];
    const navegacion = useNavigate();
    const generoSeleccionado = JSON.parse(sessionStorage.getItem('Genero'));
    const indiceGenero = generos.indexOf(generoSeleccionado);
    
    // Estados
    const [userId, setUserId] = useState('1'); // Estado para el userId con valor por defecto
    const [canciones, establecerCanciones] = useState([]);
    const [cancionElegida, establecerCancionElegida] = useState(null);
    const [urlArchivo, establecerUrlArchivo] = useState('');
    const [imagenUsuario, establecerImagenUsuario] = useState(null);
    const [cancionesArtista, establecerCancionesArtista] = useState([]);
    const [urlsImagenes, establecerUrlsImagenes] = useState([]);
    const [esListaPersonalizada, establecerEsListaPersonalizada] = useState(false);

    // Obtener el ID del usuario usando el email almacenado en sessionStorage
    useEffect(() => {
        const datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'));
        if (datosUsuario && datosUsuario.email) {
            axios.get(`http://localhost:8080/api/usuarios/contacto-por-email?email=${datosUsuario.email}`)
                .then(respuesta => {
                    setUserId(respuesta.data);
                    console.log('ID del usuario obtenido:', respuesta.data);
                    
                    // Si el género seleccionado es "Personalizado", cargamos la lista personalizada
                    if (generoSeleccionado === 'Personalizado') {
                        establecerEsListaPersonalizada(true);
                        cargarListaPersonalizada(respuesta.data);
                    }
                })
                .catch(error => {
                    console.error('Error al obtener el ID del usuario:', error);
                });
        }
    }, [generoSeleccionado]);

    // Función para cargar la lista personalizada del usuario
    const cargarListaPersonalizada = (idUsuario) => {
        axios.get(`http://localhost:8080/api/listaReproduccion/usuario/${idUsuario}/canciones`)
            .then(respuesta => {
                establecerCanciones(respuesta.data);
                console.log('Lista personalizada cargada:', respuesta.data);
            })
            .catch(error => {
                console.error('Error al obtener la lista personalizada:', error);
                // Si hay un error, mostramos un array vacío
                establecerCanciones([]);
            });
    };

    // Métodos
    const agregarUrl = (nuevaUrl) => {
        const urlsActuales = [...urlsImagenes];
        urlsActuales.push(nuevaUrl);
        establecerUrlsImagenes(urlsActuales);
    };

    const navegarAFinal = async (evento, cancion) => {
        if (evento) {
            evento.preventDefault();
        }
        sessionStorage.setItem('DatosCancion', JSON.stringify(cancion));
        navegacion('/final');
    };

    const ClickCancionDelmismoArtista = (cancion) => (evento) => navegarAFinal(evento, cancion);

    const navegarAlFinalcancionelegida = async (evento) => {
        evento.preventDefault();
        navegacion('/final');
    };

    const seleccionarFila = (cancion) => {
        establecerCancionElegida(cancion);
        sessionStorage.setItem('NombreCancion', JSON.stringify(cancion.audioCancion));
        establecerImagenUsuario(cancion.imagenCancion);

        // Obtener canciones del artista
        axios.get(`http://localhost:8080/api/canciones/artista/${cancion.artistaCancion.contacto}`)
            .then(respuesta => {
                establecerCancionesArtista(respuesta.data);
            })
            .catch(error => {
                console.error('Error al obtener las canciones del artista:', error);
            });
    };

    // Efectos
    useEffect(() => {
        const imagenCancion = cancionesArtista.map(cancion => cancion.imagenCancion);
        agregarUrl(imagenCancion);
    }, [cancionesArtista]);

    useEffect(() => {
        // Solo cargamos canciones por género si no es personalizado
        if (!esListaPersonalizada && indiceGenero !== -1 && generoSeleccionado !== 'Personalizado') {
            axios.get(`http://localhost:8080/api/canciones/por-genero/${indiceGenero + 1}`)
                .then(respuesta => {
                    establecerCanciones(respuesta.data);
                })
                .catch(error => {
                    console.error('Error al obtener las canciones:', error);
                });
        }
    }, [indiceGenero, esListaPersonalizada]);

    useEffect(() => {
        const obtenerUrls = async () => {
            if (cancionesArtista.length > 0) {
                const cancionesConUrls = await Promise.all(cancionesArtista.map(async (cancion) => {
                    if (cancion.imageUrl) return cancion;
                    const referenciaArchivo = ref(almacenamiento, `Imagen/${cancion.imagenCancion}`);
                    try {
                        const url = await getDownloadURL(referenciaArchivo);
                        return { ...cancion, imageUrl: url };
                    } catch (error) {
                        console.error('Error al obtener la URL de descarga de la imagen:', error);
                        return { ...cancion, imageUrl: null };
                    }
                }));
                establecerCancionesArtista(cancionesConUrls);
            }
        };
        obtenerUrls();
    }, [cancionesArtista]);

    useEffect(() => {
        if (imagenUsuario) {
            const referenciaArchivo = ref(almacenamiento, `Imagen/${imagenUsuario}`);
            getDownloadURL(referenciaArchivo)
                .then((url) => {
                    establecerUrlArchivo(url);
                    console.log('URL de descarga de la imagen:', url);
                    console.log(urlArchivo);
                })
                .catch((error) => {
                    console.error('Error al obtener la URL de descarga de la imagen:', error);
                });
        }
    }, [imagenUsuario]);

    // Título de la página según el modo
    const tituloPagina = esListaPersonalizada
        ? "Bad Melody - Mi Lista Personalizada"
        : `Bad Melody - ${generoSeleccionado}`;

    // Renderizado del componente
    return (
        <div>
            <div className={styles['container']}>
                <header>
                    <div className={styles['logo-container12']}>
                        <img 
                            className={styles['isotipo12']} 
                            src="/src/assets/imagenes/isotipo1.png" 
                            alt="Album Cover"
                        />
                        <h1 style={{ alignItems: 'center' }} className={styles['logo12']}>
                            {tituloPagina}
                        </h1>
                        <div className={styles['overlay']}>
                            <Opcion_Cantautor />
                        </div>
                    </div>
                </header>

                <div className={styles['main-content']}>
                    <div className={styles['playlist']}>
                        <h2>{esListaPersonalizada ? 'Mi Lista Personalizada' : 'Playlist'}</h2>
                        {canciones.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Song</th>
                                        <th style={{ paddingRight: '20px', paddingLeft: "0px", textAlign: "end" }}>ㅤFavorita</th>
                                        <th style={{ paddingLeft: "30px"}}>Año</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {canciones.map((cancion, index) => (
                                        <tr 
                                            key={cancion.id} 
                                            onClick={() => seleccionarFila(cancion)} 
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td>{index + 1}</td>
                                            <td>
                                                <div>{cancion.tituloCancion}</div>
                                                <div>{cancion.artistaCancion.nombre}</div>
                                            </td>
                                            <td style={{ textAlign:"end"}} onClick={(e) => e.stopPropagation()}>
                                                <FavoriteButton cancionId={cancion.id} userId={userId} />
                                            </td>
                                            <td style={{ paddingLeft: "30px"}} >
                                                {cancion.fechaSubidaCancion[0] || 'Desconocida'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className={styles['empty-list']}>
                                {esListaPersonalizada ? (
                                    <p>No tienes canciones en tu lista personalizada. ¡Agrega algunas marcándolas como favoritas!</p>
                                ) : (
                                    <p>No hay canciones disponibles en este género.</p>
                                )}
                            </div>
                        )}

                        {cancionElegida ? (
                            <div className={styles['now-playing']}>
                                <h2>Reproducción Actual</h2>
                                <div className={styles['now-playing-info']}>
                                    <div className={styles['album-cover1']}>
                                        <img src={urlArchivo} alt="Album Cover" />
                                    </div>
                                    <div>
                                        <div>
                                            <h2>{cancionElegida.artistaCancion.nombre}</h2>
                                            <h3><b>{cancionElegida.tituloCancion}</b></h3>
                                            <p style={{ marginTop: "30px" }}>
                                                <b>Lanzamiento:</b> {`${cancionElegida.fechaSubidaCancion[0]}`}
                                            </p>
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
                                        <div className={styles['album-cover']}>
                                            <img src={urlArchivo} alt="Album Cover" />
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
                                        <div className={styles['album-cover']} onClick={navegarAlFinalcancionelegida}>
                                            <img 
                                                src="/src/assets/imagenes/Gestion-prueva/ImagenDisco.jpg" 
                                                alt="Album Cover" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h4>{esListaPersonalizada ? 'Tu Colección Personal' : 'Conoce'}</h4>
                                <p>{esListaPersonalizada ? 'Tus Favoritos' : 'Solo Para Curioso'}</p>
                                <p>
                                    {esListaPersonalizada 
                                        ? 'Aquí encontrarás todas tus canciones favoritas en un solo lugar. Disfruta de tu selección personalizada.'
                                        : 'Explora la historia y el sentimiento que se esconden detrás de esta melodía. Cada canción es un testimonio de la belleza y el poder de la música.'}
                                </p>
                            </div>
                        )}

                        {cancionesArtista.length > 0 ? (
                            <div>
                                <h2>Canciones del mismo artista</h2>
                                <div className={styles['related-albums']}>
                                    {cancionesArtista.reduce((filas, cancion, index) => {
                                        if (index % 2 === 0) filas.push([]);
                                        filas[filas.length - 1].push(cancion);
                                        return filas;
                                    }, []).map((fila, indiceFila) => (
                                        <div key={indiceFila} style={{ marginBottom: '20px' }}>
                                            {fila.map((cancion, index) => (
                                                <div key={index} onClick={ClickCancionDelmismoArtista(cancion)}>
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
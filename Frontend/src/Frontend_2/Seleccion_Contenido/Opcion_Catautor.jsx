import axios from 'axios';
import { Music, Trash2, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase'; // Asegúrate de que la ruta sea correcta
import FileUpload from '../../FileUpload';
import styles from "./Opcion_Catautor.module.css";

export default function Opcion_Cantautor() {
    const [artistaId, setArtistaId] = useState(0);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [menuboton, setmenuboton] = useState(false);
    const [canciones, setCanciones] = useState([]);
    const [loadingCanciones, setLoadingCanciones] = useState(true); // Start with loading true
    const [cancionAEliminar, setCancionAEliminar] = useState(null);
    const [eliminando, setEliminando] = useState(false);

    const [tituloCancion, setTituloCancion] = useState('');
    const [descriptionC, setdescriptionC] = useState('');
    const [generoId, setGeneroId] = useState(1);

    const [nombreArchivoAudio, setNombreArchivoAudio] = useState('');
    const [nombreArchivoImagen, setNombreArchivoImagen] = useState('');
    const [nombreArchivoVideo, setNombreArchivoVideo] = useState('');

    const [archivoSeleccionadoAudio, setArchivoSeleccionadoAudio] = useState(null);
    const [archivoSeleccionadoVideo, setArchivoSeleccionadoVideo] = useState(null);
    const [archivoSeleccionadoImagen, setArchivoSeleccionadoImagen] = useState(null);

    const navigate = useNavigate();

    // Función para eliminar un archivo de Firebase Storage
    const eliminarArchivoDeStorage = async (folderName, nombreArchivo) => {
        if (!folderName || !nombreArchivo) {
            console.error("Debes proporcionar el nombre del archivo y la carpeta.");
            return;
        }
        const fileRef = ref(storage, `${folderName}/${nombreArchivo}`);
        try {
            await deleteObject(fileRef);
            console.log(`Archivo "${nombreArchivo}" eliminado con éxito.`);
        } catch (error) {
            console.error("Error al eliminar el archivo:", error);
        }
    };

    const buscarUsuario = async () => {
        try {
            // Asegurarse de que los datos del usuario estén disponibles
            const contactodelacuenta = JSON.parse(sessionStorage.getItem('datosUsuario'));
            
            if (!contactodelacuenta || !contactodelacuenta.email) {
                console.error("No hay datos de usuario en sessionStorage");
                setLoadingCanciones(false);
                return;
            }
            
            console.log("Buscando usuario con email:", contactodelacuenta.email);
            
            const response = await axios.get(`http://localhost:8080/api/usuarios/contacto-por-email?email=${contactodelacuenta.email}`);
            
            console.log("ID del artista encontrado:", response.data);
            setArtistaId(response.data);
            
            // Una vez que tenemos el ID del artista, cargamos sus canciones
            await cargarCanciones(response.data);
        } catch (err) {
            console.error("Error al buscar usuario:", err);
            setArtistaId(null);
            setLoadingCanciones(false);
        }
    };

    const cargarCanciones = async (id) => {
        if (!id) {
            console.error("No se puede cargar canciones sin ID de artista");
            setLoadingCanciones(false);
            return;
        }
        
        try {
            setLoadingCanciones(true);
            console.log("Cargando canciones para el artista ID:", id);
            
            const response = await axios.get(`http://localhost:8080/api/canciones/artista/${id}`);
            
            console.log("Canciones recibidas:", response.data);
            setCanciones(response.data);
        } catch (error) {
            console.error("Error al cargar las canciones:", error);
            setCanciones([]);
        } finally {
            setLoadingCanciones(false);
        }
    };

    useEffect(() => {
        console.log("Componente montado, buscando usuario...");
        buscarUsuario();
        
        // Función de limpieza para el efecto
        return () => {
            console.log("Componente desmontado");
        };
    }, []);

    // Efecto adicional para actualizar las canciones cuando se abre el diálogo de eliminación
    useEffect(() => {
        if (isDeleteDialogOpen && artistaId) {
            console.log("Diálogo de eliminación abierto, recargando canciones...");
            cargarCanciones(artistaId);
        }
    }, [isDeleteDialogOpen, artistaId]);

    const manejarCambioArchivoAudio = (event) => {
        const archivo = event.target.files[0];
        setArchivoSeleccionadoAudio(archivo);
        setNombreArchivoAudio(archivo ? archivo.name : '');
    };

    const manejarCambioArchivoVideo = (event) => {
        const archivo = event.target.files[0];
        setArchivoSeleccionadoVideo(archivo);
        setNombreArchivoVideo(archivo ? archivo.name : '');
    };

    const manejarCambioArchivoImagen = (event) => {
        const archivo = event.target.files[0];
        setArchivoSeleccionadoImagen(archivo);
        setNombreArchivoImagen(archivo ? archivo.name : '');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        registrarCancion();
        setIsAddDialogOpen(false);
    };

    const menu = () => {
        setmenuboton(!menuboton);
    };

    const registrarCancion = async () => {
        try {
            FileUpload({ folderName: 'Audio', file: archivoSeleccionadoAudio });
            FileUpload({ folderName: 'Imagen', file: archivoSeleccionadoImagen });
            if (archivoSeleccionadoVideo != null) {
                FileUpload({ folderName: 'Video', file: archivoSeleccionadoVideo });
            }

            const nuevaCancion = {
                tituloCancion: tituloCancion,
                audioCancion: nombreArchivoAudio,
                videoCancion: nombreArchivoVideo,
                imagenCancion: nombreArchivoImagen,
                artistaCancion: {
                    contacto: artistaId
                },
                generoCancion: {
                    id: generoId
                },
                description: descriptionC
            };

            const response = await axios.post('http://localhost:8080/api/canciones', nuevaCancion, {
                withCredentials: true,
            });

            if (response.status === 201) {
                console.log('Canción registrada exitosamente:', response.data);
                // Recargar la lista de canciones después de añadir una nueva
                cargarCanciones(artistaId);
                // Limpiar los campos del formulario
                setTituloCancion('');
                setdescriptionC('');
                setGeneroId(1);
                setNombreArchivoAudio('');
                setNombreArchivoImagen('');
                setNombreArchivoVideo('');
                setArchivoSeleccionadoAudio(null);
                setArchivoSeleccionadoImagen(null);
                setArchivoSeleccionadoVideo(null);
                
                // Mostrar mensaje de éxito
                alert('Canción registrada exitosamente');
            }
        } catch (error) {
            console.error('Error al registrar la canción:', error.response?.data || error.message);
            alert('Error al registrar la canción: ' + (error.response?.data?.message || error.message));
        }
    };

    const confirmarEliminarCancion = (cancion) => {
        setCancionAEliminar(cancion);
    };

    const eliminarCancion = async () => {
        if (!cancionAEliminar) return;

        setEliminando(true);

        try {
            // 1. Eliminar archivo de audio de Firebase Storage
            await eliminarArchivoDeStorage('Audio', cancionAEliminar.audioCancion);

            // 2. Eliminar imagen de canción de Firebase Storage si existe
            if (cancionAEliminar.imagenCancion) {
                await eliminarArchivoDeStorage('Imagen', cancionAEliminar.imagenCancion);
            }

            // 3. Eliminar video de canción de Firebase Storage si existe
            if (cancionAEliminar.videoCancion) {
                await eliminarArchivoDeStorage('Video', cancionAEliminar.videoCancion);
            }

            // 4. Eliminar la canción del backend
            const response = await axios.delete(`http://localhost:8080/api/canciones/${cancionAEliminar.id}`);

            if (response.status === 200 || response.status === 204) {
                // 5. Actualizar el estado de las canciones
                setCanciones(canciones.filter(cancion => cancion.id !== cancionAEliminar.id));

                // Mostrar mensaje de éxito
                alert(`Canción "${cancionAEliminar.tituloCancion}" eliminada correctamente`);
            }
        } catch (err) {
            console.error("Error al eliminar la canción:", err);
            alert(`Error al eliminar la canción: ${err.message}`);
        } finally {
            setEliminando(false);
            setCancionAEliminar(null);
        }
    };

    const cerrarSesion = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div className={styles['music-menu']}>
            <div className={styles['dropdown']}>
                <button className={styles['dropdown-trigger']} onClick={menu}>
                    <img id="logoutImage" src="src/assets/imagenes/Gestion-prueva/12.png" width="35px" height="35px" alt="Menú de opciones" style={{ cursor: 'pointer' }} />
                </button>
                {menuboton && (
                    <div className={styles['dropdown-content']}>
                        <button onClick={() => { setIsAddDialogOpen(true); menu(); }}>
                            <Music className={styles['icon']} />
                            <span>Subir Canción</span>
                        </button>
                        <button onClick={() => { setIsDeleteDialogOpen(true); menu(); }}>
                            <Trash2 className={styles['icon']} />
                            <span>Eliminar Canción</span>
                        </button>
                        <button onClick={cerrarSesion}>
                            <LogOut className={styles['icon']} />
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Diálogo para subir canción */}
            {isAddDialogOpen && (
                <div className={styles['dialog']}>
                    <div className={styles['dialog-content']}>
                        <div className={styles['top']}>
                            <h2 style={{ whiteSpace: 'nowrap' }}>Subir Canción</h2>
                            <button className={styles['close-button']} onClick={() => setIsAddDialogOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={styles['form-group']}>
                                <label htmlFor="title">Título de la canción</label>
                                <input
                                    id="title"
                                    type="text"
                                    value={tituloCancion}
                                    required
                                    onChange={(e) => setTituloCancion(e.target.value)}
                                />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="description">Descripción de la canción</label>
                                <textarea
                                    required
                                    id="description"
                                    value={descriptionC}
                                    onChange={(e) => setdescriptionC(e.target.value)}
                                ></textarea>
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="audio">Audio de la canción</label>
                                <input id="audio" type="file" accept="audio/*" onChange={manejarCambioArchivoAudio} required />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="image">Imagen de la canción</label>
                                <input id="image" type="file" accept="image/*" onChange={manejarCambioArchivoImagen} required />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="video">Video de la canción (opcional)</label>
                                <input id="video" type="file" accept="video/*" onChange={manejarCambioArchivoVideo} />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="genre">Género musical</label>
                                <select
                                    required
                                    id="genre"
                                    value={generoId}
                                    onChange={(e) => setGeneroId(parseInt(e.target.value))}
                                >
                                    <option value="1">Rock</option>
                                    <option value="2">Salsa</option>
                                    <option value="3">Joropo</option>
                                    <option value="4">Pop</option>
                                    <option value="5">Jazz</option>
                                    <option value="6">Clásica</option>
                                    <option value="7">Reggaeton</option>
                                    <option value="8">Hip hop</option>
                                    <option value="9">Tango</option>
                                    <option value="10">Electrónica</option>
                                </select>
                            </div>
                            <button type="submit" className={styles['submit-button']}>Subir Canción</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Diálogo para eliminar canción */}
            {isDeleteDialogOpen && (
                <div className={styles['dialog']}>
                    <div className={styles['dialog-content']}>
                        <div className={styles['top']}>
                            <h2 style={{ whiteSpace: 'nowrap', marginTop: "18px" }}>Eliminar Canción</h2>
                            <button className={styles['close-button1']} onClick={() => setIsDeleteDialogOpen(false)}>×</button>
                        </div>

                        {loadingCanciones ? (
                            <div className={styles['loading']}>Cargando canciones...</div>
                        ) : canciones.length === 0 ? (
                            <div className={styles['no-songs']}>No hay canciones disponibles para eliminar.</div>
                        ) : (
                            <div className={styles['songs-list']}>
                                <h3>Selecciona una canción para eliminar:</h3>
                                <ul className={styles['songs-items']}>
                                    {canciones.map((cancion) => (
                                        <li key={cancion.id} className={styles['song-item']}>
                                            <div className={styles['song-info']}>
                                                <span className={styles['song-title']}>{cancion.tituloCancion}{"ㅤ-ㅤ"}</span>
                                                <span className={styles['song-genre']}>{cancion.generoCancion.nombreGenero}</span>
                                            </div>
                                            <button
                                                onClick={() => confirmarEliminarCancion(cancion)}
                                                className={styles['delete-button']}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modal de confirmación para eliminar canción */}
            {cancionAEliminar && (
                <div className={styles['dialog']}>
                    <div className={styles['dialog-content']}>
                        <div className={styles['confirmation-content']}>
                            <h3>Confirmar eliminación</h3>
                            <p>¿Estás seguro de que deseas eliminar la canción "{cancionAEliminar.tituloCancion}"?</p>
                            <p>Esta acción no se puede deshacer.</p>

                            <div className={styles['confirmation-buttons']}>
                                <button
                                    onClick={() => setCancionAEliminar(null)}
                                    className={styles['cancel-button']}
                                    disabled={eliminando}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={eliminarCancion}
                                    className={styles['confirm-button']}
                                    disabled={eliminando}
                                >
                                    {eliminando ? 'Eliminando...' : 'Eliminar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
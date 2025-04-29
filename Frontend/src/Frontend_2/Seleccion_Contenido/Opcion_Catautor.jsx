import axios from 'axios';
import { Music, Trash2, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../FileUpload';
import styles from "./Opcion_Catautor.module.css";

const contactodelacuenta = JSON.parse(sessionStorage.getItem('datosUsuario'));

export default function Opcion_Cantautor() {
    const [artistaId, setArtistaId] = useState(0);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [menuboton, setmenuboton] = useState(false);

    const [tituloCancion, setTituloCancion] = useState('');
    const [descriptionC, setdescriptionC] = useState('');
    const [generoId, setGeneroId] = useState(1);

    const [nombreArchivoAudio, setNombreArchivoAudio] = useState('');
    const [nombreArchivoImagen, setNombreArchivoImagen] = useState('');
    const [nombreArchivoVideo, setNombreArchivoVideo] = useState('');

    const [archivoSeleccionadoAudio, setArchivoSeleccionadoAudio] = useState(null);
    const [archivoSeleccionadoVideo, setArchivoSeleccionadoVideo] = useState(null);
    const [archivoSeleccionadoImagen, setArchivoSeleccionadoImagen] = useState(null);

    const navigate = useNavigate(); // 👈 aquí usamos navigate

    const buscarUsuario = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuarios/contacto-por-email?email=${contactodelacuenta.email}`);
            setArtistaId(response.data);
        } catch (err) {
            setArtistaId(null);
        }
    };

    useEffect(() => {
        buscarUsuario();
    }, []);

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
        console.log("Canción subida");
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
            }
        } catch (error) {
            console.error('Error al registrar la canción:', error.response?.data || error.message);
        }
    };

    const eliminarCancion = () => {
        alert('Función de eliminar canción aún no implementada.');
        menu();
    };

    const cerrarSesion = () => {
        sessionStorage.clear();
        navigate('/'); // 👈 redirigimos al login principal
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
                        <button onClick={eliminarCancion}>
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
                                <input id="title" type="text" required onChange={(e) => setTituloCancion(e.target.value)} />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="description">Descripción de la canción</label>
                                <textarea required id="description" onChange={(e) => setdescriptionC(e.target.value)}></textarea>
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
                                <select required id="genre" onChange={(e) => setGeneroId(e.target.selectedIndex)}>
                                    <option value="">Selecciona un género</option>
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
                            <button onClick={registrarCancion} type="submit" className={styles['submit-button']}>Subir Canción</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

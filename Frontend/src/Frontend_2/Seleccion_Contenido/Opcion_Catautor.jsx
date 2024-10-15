import axios from 'axios';
import { Music } from "lucide-react";
import React, { useState } from "react";
import FileUpload from '../../FileUpload';
import styles from "./Opcion_Catautor.module.css";


export default function Opcion_Cantautor() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [menuboton, setmenuboton] = useState(false);
    const [songs, setSongs] = useState(["Canción 1", "Canción 2", "Canción 3", "Canción 4", "Canción 5"]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [tituloCancion, setTituloCancion] = useState('');
    const [descriptionC, setdescriptionC] = useState('');
    const [artistaId, setArtistaId] = useState(3101010101);
    const [generoId, setGeneroId] = useState(1);

    const [nombreArchivoAudio, setNombreArchivoAudio] = useState('');
    const [nombreArchivoImagen, setNombreArchivoImagen] = useState('');
    const [nombreArchivoVideo, setNombreArchivoVideo] = useState('');

    const [archivoSeleccionadoAudio, setArchivoSeleccionadoAudio] = useState(null);
    const [archivoSeleccionadoVideo, setArchivoSeleccionadoVideo] = useState(null);
    const [archivoSeleccionadoImagen, setArchivoSeleccionadoImagen] = useState(null);

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

    const handleDelete = () => {
        setSongs(songs.filter(song => !selectedSongs.includes(song)));
        setSelectedSongs([]);
        setIsDeleteDialogOpen(false);
    };

    const menu = () => {
        setmenuboton(!menuboton);
    };

    const handleSelectSong = (song) => {
        setSelectedSongs((prevSelected) =>
            prevSelected.includes(song)
                ? prevSelected.filter((s) => s !== song)
                : [...prevSelected, song]
        );
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

    return (
        <div className={styles['music-menu']}>
            <div className={styles['dropdown']}>
                <button className={styles['dropdown-trigger']} onClick={menu}>Menú de Música</button>
                {menuboton && (
                    <div className={styles['dropdown-content']}>
                        <button onClick={() => { setIsAddDialogOpen(true); menu(); }}>
                            <Music className={styles['icon']} />
                            <span>Subir Canción</span>
                        </button>
                        {/*
                        <button onClick={() => { setIsDeleteDialogOpen(true); setSelectedSongs([]); menu(); }}>
                            <Trash2 className={styles['icon']} />
                            <span>Eliminar Canciones</span>
                        </button>
                        */}
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
                                <label htmlFor="genre"  >Género musical</label>
                                <select required id="genre" onChange={(e) => setGeneroId(e.target.selectedIndex)}>
                                    <option value="">Selecciona un género</option>
                                    <option value="1">Rock</option>
                                    <option value="2">Salsa</option>
                                    <option value="3">Joropo</option>
                                    <option value="4">Pop</option>
                                    <option value="5">Jazz</option>
                                    <option value="6">Clasica</option>
                                    <option value="7">Reggaeton</option>
                                    <option value="8">Hip hop</option>
                                    <option value="9">Tango</option>
                                    <option value="10">Electrica</option>
                                </select>
                            </div>
                            <button onClick={registrarCancion} type="submit" className={styles['submit-button']}>Subir Canción</button>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteDialogOpen && (
                <div className={styles['dialog']}>
                    <div className={styles['dialog-content']}>
                        <h2>Eliminar Canciones</h2>
                        <p>Selecciona las canciones que deseas eliminar:</p>
                        <ul className={styles['song-list']}>
                            {songs.map((song, index) => (
                                <li key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedSongs.includes(song)}
                                            onChange={() => handleSelectSong(song)}
                                        />
                                        {song}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <div className={styles['button-group']}>
                            <button onClick={() => { setIsDeleteDialogOpen(false); setSelectedSongs([]); }}>Cancelar</button>
                            <button
                                onClick={handleDelete}
                                className={styles['delete-button']}
                                disabled={selectedSongs.length === 0}
                            >
                                Eliminar ({selectedSongs.length})
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
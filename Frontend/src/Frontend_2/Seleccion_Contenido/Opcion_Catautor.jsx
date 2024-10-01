import { Music, Trash2 } from "lucide-react";
import React, { useState } from "react";
import styles from "./Opcion_Catautor.module.css";

export default function Opcion_Cantautor() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [menuboton, setmenuboton] = useState(false);
    const [songs, setSongs] = useState(["Canción 1", "Canción 2", "Canción 3", "Canción 4", "Canción 5"]); // Example songs
    const [selectedSongs, setSelectedSongs] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí iría la lógica para manejar la subida de la canción
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
    
    const [tituloCancion, setTituloCancion] = useState('');
    const [descriptionC, setdescriptionC] = useState('');
    const [audioCancion, setAudioCancion] = useState('');
    const [videoCancion, setVideoCancion] = useState('');
    const [imagenCancion, setImagenCancion] = useState('');
    const [artistaId, setArtistaId] = useState(1);  // Suponiendo que tienes el ID del artista disponible
    const [generoId, setGeneroId] = useState(1);  // Suponiendo que tienes el ID del género disponible

    const registrarCancion = async () => {
        try {
            // Preparar los datos de la canción
            const nuevaCancion = {
                tituloCancion: tituloCancion,
                imagenCancion: imagenCancion?.name,
                videoCancion: videoCancion?.name || null,
                AudioCancion: audioCancion?.name || null,  // Campo requerido
                ArtistaCancion: { id: artistaId },
                cancion: { id: generoId },  // El ID del género de la canción
            };

            // Realizar la solicitud POST
            const response = await axios.post('http://localhost:8080/api/canciones/registrar', nuevaCancion, {
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
                        <button onClick={() => { setIsDeleteDialogOpen(true); setSelectedSongs([]); menu(); }}>
                            <Trash2 className={styles['icon']} />
                            <span>Eliminar Canciones</span>
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
                                <textarea id="description" onChange={(e) => setdescriptionC(e.target.value)}></textarea>
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="audio">Audio de la canción</label>
                                <input id="audio" type="file" accept="audio/*" onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="image">Imagen de la canción</label>
                                <input id="image" type="file" accept="image/*" onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="video">Video de la canción (opcional)</label>
                                <input id="video" type="file" accept="video/*" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="genre">Género musical</label>
                                <select id="genre" onChange={(e) => setGeneroId(e.target.selectedIndex)}>
                                    <option value="">Selecciona un género</option>
                                    <option value="1">Pop</option>
                                    <option value="2">Rock</option>
                                    <option value="3">Jazz</option>
                                    <option value="4">Clásica</option>
                                    <option value="5">Electrónica</option>
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
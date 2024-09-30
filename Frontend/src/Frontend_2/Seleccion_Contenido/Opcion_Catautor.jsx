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
                                <input id="title" type="text" required />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="description">Descripción de la canción</label>
                                <textarea id="description"></textarea>
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="audio">Audio de la canción</label>
                                <input id="audio" type="file" accept="audio/*" required />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="image">Imagen de la canción</label>
                                <input id="image" type="file" accept="image/*" required />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="video">Video de la canción (opcional)</label>
                                <input id="video" type="file" accept="video/*" />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="genre">Género musical</label>
                                <select id="genre">
                                    <option value="">Selecciona un género</option>
                                    <option value="pop">Pop</option>
                                    <option value="rock">Rock</option>
                                    <option value="jazz">Jazz</option>
                                    <option value="classical">Clásica</option>
                                    <option value="electronic">Electrónica</option>
                                </select>
                            </div>
                            <button type="submit" className={styles['submit-button']}>Subir Canción</button>
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
                            <button onClick={() => {setIsDeleteDialogOpen(false); setSelectedSongs([]);}}>Cancelar</button>
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
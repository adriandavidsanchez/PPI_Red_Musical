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
        setSelectedSongs((prevSelected) => prevSelected.includes(song)? prevSelected.filter((s) => s !== song): [...prevSelected, song]
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
                            {/* Form fields remain the same */}
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
                                        <input type="checkbox" checked={selectedSongs.includes(song)} onChange={() => handleSelectSong(song)}/>{song}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <div className={styles['button-group']}>
                            <button onClick={() => {setIsDeleteDialogOpen(false); setSelectedSongs([]);}}>Cancelar</button>
                            <button onClick={handleDelete} className={styles['delete-button']} disabled={selectedSongs.length === 0}>Eliminar ({selectedSongs.length})</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
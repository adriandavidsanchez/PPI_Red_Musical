import React from 'react';

import { useNavigate } from 'react-router-dom';
import AudioPlayer from '../AudioPlayer';
import Opcion_Cantautor from './Opcion_Catautor';
import styles from './seleccion_contenido.module.css'; // Asegúrate de que el nombre del archivo sea correcto

// Estilo para el hea

const RedesignedComponent = () => {

    const navigate = useNavigate();
    const AlbumClick = async (event) => {
        event.preventDefault(); // Esto previene el comportamiento predeterminado del clic, si existe alguno.
        console.log('hola'); // Este mensaje debería aparecer en la consola
        navigate('/final'); // Navegar a la ruta '/detalle'
    };
    return (

        <div>
            <div className={styles['container']}>
                <header>
                    <div className={styles['logo-container12']}>
                        <img className={styles['isotipo12']} src="/src/assets/imagenes/isotipo1.png" alt="Album Cover"></img>
                        <h1 style={{ alignItems: 'center' }} className={styles['logo12']}>Bad Melody - Rock</h1>
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
                                    <th style={{ paddingRight: '0px', paddingLeft: '30px' }}>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <div>Stairway to Heaven</div>
                                        <div className={styles['artist']}>Led Zeppelin</div>
                                    </td>
                                    <td>8:02</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>
                                        <div>Bohemian Rhapsody</div>
                                        <div className={styles['artist']}>Queen</div>
                                    </td>
                                    <td>5:55</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>
                                        <div>Hotel California</div>
                                        <div className={styles['artist']}>Eagles</div>
                                    </td>
                                    <td>6:30</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>
                                        <div>Sweet Child O’ Mine</div>
                                        <div className={styles['artist']}>Guns N’ Roses</div>
                                    </td>
                                    <td>5:56</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>
                                        <div>Smells Like Teen Spirit</div>
                                        <div className={styles['artist']}>Nirvana</div>
                                    </td>
                                    <td>5:01</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={styles['now-playing']}>
                            <h2>Reproducción Actual</h2>
                            <div className={styles['now-playing-info']}>
                                <div className={styles['album-cover1']} onClick={AlbumClick}>
                                    <img src="/src/assets/imagenes/Gestion-prueva/dis10.jpg" alt="Album Cover" ></img>
                                </div>
                                <div>
                                    <h2>Foster The People</h2>
                                    <h3><b>- Pumped Up Kicks</b></h3>
                                    <p><b>Productores:</b> Mark Foster</p>
                                    <p><b>Lanzamiento:</b> 14 de septiembre, 2010</p>
                                    <p><b>Genre:</b> Rock</p>
                                </div>
                            </div>
                            <div>
                                <AudioPlayer />
                            </div>
                        </div>
                    </div>

                    <div className={styles['album-details']}>
                        <div>
                            <h2>Descripción</h2>
                            <div className={styles['related-albums']}>
                                <div>
                                    <div className={styles['album-cover']} onClick={AlbumClick}>
                                        <img src="/src/assets/imagenes/Gestion-prueva/dis10.jpg" alt="Album Cover"></img>
                                    </div>
                                </div>
                            </div>
                            <h3>Foster The People</h3>
                            <p>Pumped Up Kicks</p>
                            <p>“Pumped Up Kicks” es conocida por su melodía pegajosa y su ritmo ligero. La inspiración para la canción surgió
                                de la intención de Foster de explorar la mente de un adolescente aislado y perturbado, reflejando problemas
                                de salud mental y violencia juvenil.</p>
                        </div>
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


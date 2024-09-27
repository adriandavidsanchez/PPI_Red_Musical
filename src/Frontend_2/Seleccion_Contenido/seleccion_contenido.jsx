import React from 'react';
import AudioPlayer from '../AudioPlayer';
import Opcion_Cantautor from './Opcion_Catautor';
import './seleccion_contenido.css';
const RedesignedComponent = () => {
return (
<div>
    <div className="container">
        <header>
        <div className="logo-container12">
            <img className='isotipo12' src="src/assets/imagenes/isotipo1.svg" alt="Isotipo" />
            <h1 style={{ alignItems: 'center' }} className="logo12">Bad Melody - Rock</h1>
            <div className="overlay">
                <Opcion_Cantautor/>
            </div>
        </div>
        </header>

        <div className="main-content">
            <div className="playlist">
                <h2>Playlist</h2>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Song</th>
                            <th style={{ paddingRight: '0px',paddingLeft: '30px' }}>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <div>Stairway to Heaven</div>
                                <div className="artist">Led Zeppelin</div>
                            </td>
                            <td>8:02</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>2</td>
                            <td>
                                <div>Bohemian Rhapsody</div>
                                <div className="artist">Queen</div>
                            </td>
                            <td>5:55</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>3</td>
                            <td>
                                <div>Hotel California</div>
                                <div className="artist">Eagles</div>
                            </td>
                            <td>6:30</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>4</td>
                            <td>
                                <div>Sweet Child O’ Mine</div>
                                <div className="artist">Guns N’ Roses</div>
                            </td>
                            <td>5:56</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>5</td>
                            <td>
                                <div>Smells Like Teen Spirit</div>
                                <div className="artist">Nirvana</div>
                            </td>
                            <td>5:01</td>
                        </tr>
                    </tbody>
                </table>
                <div className="now-playing">
            <h2>Reproducción Actual</h2>
            <div className="now-playing-info">
                <div className="album-cover1" >
                    <img src="/src/assets/imagenes/Gestion-prueva/dis10.jpg" alt="Album Cover"></img>
                </div>
                <div>
                    <h2>Foster The People</h2>
                    <h3><b>- Pumped Up Kicks</b></h3>
                    <p><b>Productores:</b> Mark Foster</p>
                    <p><b>Lanzamiento:</b> 14 de septiembre, 2010</p>
                    <p><b>Genre: </b>Rock</p>
                </div>
            </div>
            <div >
            < AudioPlayer />
            </div>
        </div>
            </div>

            <div className="album-details">
                <div>
                    <h2>Descripción</h2>
                    <div className="related-albums">
                        <div>
                            <div className="album-cover" >
                                <img src="/src/assets/imagenes/Gestion-prueva/dis10.jpg" alt="Album Cover"></img>
                            </div>
                        </div>
                    </div>
                    <h3>Foster The People</h3>
                    <p>Pumped Up Kicks</p>
                    <p>“Pumped Up Kicks” es conocida por su melodía pegajosa y su ritmo ligero, La inspiración para la canción surgió
                            de la intención de Foster de explorar la mente de un adolescente aislado y perturbado, reflejando problemas
                            de salud mental y violencia juvenil.</p>

                </div>
                <h2>Album Details</h2>
                <div>
                    <div style={{display: 'flex'}}>
                        <div>
                        <img className="Discos12" src="/src/assets/imagenes/Gestion-prueva/dis6.jpg" alt="Album Name" />
                        <p className="texto5">Resistance</p>
                        <p className="texto6">Electrónica</p>
                        </div>
                        <div style={{marginLeft: '20px'}}>
                        <img className="Discos12" src="/src/assets/imagenes/Gestion-prueva/dis7.jpg" alt="Album Name" />
                        <p className="texto5">Black Holes and Revelations</p>
                        <p className="texto6">Clásica</p>
                        </div>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div>
                        <img className="Discos12" src="/src/assets/imagenes/Gestion-prueva/dis8.jpg" alt="Album Name" />
                        <p className="texto5">Absolution</p>
                        <p className="texto6">Rock</p>
                        </div>
                        <div style={{marginLeft: '20px'}}>
                        <img className="Discos12" src="/src/assets/imagenes/Gestion-prueva/dis9.jpg" alt="Album Name" />
                        <p className="texto5">Origin of Symmetry</p>
                        <p className="texto6">Pop</p>
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

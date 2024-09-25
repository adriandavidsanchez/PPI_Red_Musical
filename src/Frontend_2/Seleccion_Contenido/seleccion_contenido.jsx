import React from 'react';
import AudioPlayer from '../AudioPlayer';
import './seleccion_contenido.css';

const RedesignedComponent = () => {
return (
<div>
    <div className="container">
        <header>
            <h1>♪ Music Player</h1>
            <div>
                <span></span>
                <span></span>
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
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <div>Starlight</div>
                                <div className="artist">Muse</div>
                            </td>
                            <td>4:24</td>
                        </tr>
                    </tbody>
                </table>
                <div className="now-playing">
            <h2>Now Playing</h2>
            <div className="now-playing-info">
                <div className="album-cover"></div>
                <div>
                    <h3>Starlight</h3>
                    <p>Muse</p>
                    <p>From the album "The 2nd Law"</p>
                    <p>Released: September 28, 2012</p>
                    <p>Genre: Alternative Rock</p>
                </div>
            </div>
            <div >
            < AudioPlayer />
            </div>
        </div>
            </div>

            <div className="album-details">
                <div>
                    <h2>Related Albums</h2>
                    <div className="related-albums">
                        <div>
                            <div className="album-cover"></div>
                            <p>Absolution</p>
                            <p className="artist">Muse</p>
                        </div>
                    </div>
                    <h3>The 2nd Law</h3>
                    <p>Muse</p>
                    <p>The 2nd Law is the sixth studio album by the English rock band Muse,
released on 28 September 2012 through Warner Bros. Records. The album 
was produced by the band and mixed by English producer Markus Dravs.</p>

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

import React from 'react';
import styled from 'styled-components';
import { setTextoCompartidoAudio, textoCompartidoCancion } from '../../Variables.jsx';
import AudioPlayer from '../AudioPlayer';
import styles from './valoracion_contenido.module.css';
const StyledButton = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;




function Valoracion() {
    setTextoCompartidoAudio(textoCompartidoCancion.audioCancion);

    return (
        <div className={styles['container']}>
            
            <div className={styles['video-container']}>
                {/*
                <video className={styles['video']} controls>
                    <source src={textoCompartidoCancion.audioCancion} type="Audio/mp4" />
                </video>
                */}
                <img src={textoCompartidoCancion.imageUrl} style={{width: '760px'}} alt="Album Cover2" />
                <AudioPlayer />
                <div className={styles['video-info']}>
                    <h2>{textoCompartidoCancion.tituloCancion}</h2>
                    <div className={styles['rating']}>
                        <span className={`${styles['star']} ${styles['filled']}`}>&#9733;</span>
                        <span className={`${styles['star']} ${styles['filled']}`}>&#9733;</span>
                        <span className={`${styles['star']} ${styles['filled']}`}>&#9733;</span>
                        <span className={styles['star']}>&#9734;</span>
                        <span className={styles['star']}>&#9734;</span>
                        <span> 4.2</span>
                    </div>
                </div>
            </div>

            <div className={styles['comments-section']}>
                <h3>Comentarios</h3>
                <div className={styles['comment']}>
                    <div className={styles['avatar']}>AC</div>
                    <div className={styles['comment-content']}>
                        <strong>@iamwillpursell</strong>
                        <p>This is such a classic! I love the animation and the soundtrack is amazing.</p>
                    </div>
                </div>
                <div className={styles['comment']}>
                    <div className={styles['avatar']}>OA</div>
                    <div className={styles['comment-content']}>
                        <strong>@HackSoft</strong>
                        <p>The animation is so smooth and the story is really engaging. I can see why this is a classic.</p>
                    </div>
                </div>
                <div className={styles['comment']}>
                    <div className={styles['avatar']}>GR</div>
                    <div className={styles['comment-content']}>
                        <strong>@greed7513</strong>
                        <p>This is one of my all-time favorite animations. The attention to detail is incredible.</p>
                    </div>
                </div>
            </div>

            <div className={styles['review-section']}>
                <h3>Deja una reseña</h3>
                <form className={styles['review-form']}>
                    <label>Rating
                        <div className={styles['rating']}>
                            <span className={styles['star']}>☆</span>
                            <span className={styles['star']}>☆</span>
                            <span className={styles['star']}>☆</span>
                            <span className={styles['star']}>☆</span>
                            <span className={styles['star']}>☆</span>
                        </div>
                    </label>
                    <label>Comment
                        <textarea placeholder="Comparte tus pensamientos..." rows="3"></textarea>
                    </label>
                    <StyledButton  type="submit">Submit Review</StyledButton >
                </form>
            </div>
        </div>
    );
}

export default Valoracion;

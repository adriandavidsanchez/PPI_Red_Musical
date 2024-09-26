import React from 'react';
import './valoracion_contenido.css';

function Valoracion() {
return (
    <div className="container">
    <div className="video-container">
        <video className="video" controls>
            <source src="/src/assets/imagenes/gestion-prueva/dis11.mp4" type="video/mp4"/>
        </video>
        <div className="video-info">
            <h2>Pumped Up Kicks</h2>
            <div className="rating">
            <span className="star filled">&#9733;</span>
            <span className="star filled">&#9733;</span>
            <span className="star filled">&#9733;</span>
            <span className="star">&#9734;</span>
            <span className="star">&#9734;</span>
            <span> 4.2</span>
        </div>
        </div>
    </div>

    <div className="comments-section">
        <h3>Comentarios</h3>
        <div className="comment">
            <div className="avatar">AC</div>
            <div className="comment-content">
            <strong>@iamwillpursell</strong>
            <p>This is such a classic! I love the animation and the soundtrack is amazing.</p>
            </div>
        </div>
        <div className="comment">
            <div className="avatar">OA</div>
            <div className="comment-content">
            <strong>@HackSoft</strong>
            <p>The animation is so smooth and the story is really engaging. I can see why this is a classic.</p>
            </div>
        </div>
        <div className="comment">
            <div className="avatar">GR</div>
            <div className="comment-content">
            <strong>@greed7513</strong>
            <p>This is one of my all-time favorite animations. The attention to detail is incredible.</p>
            </div>
        </div>
    </div>

    <div className="review-section">
        <h3>Deja una reseña</h3>
        <form className="review-form">
            <label> Rating
                <div className="rating">
                <span className="star">☆</span>
                <span className="star">☆</span>
                <span className="star">☆</span>
                <span className="star">☆</span>
                <span className="star">☆</span>
                </div>
            </label>
            <label>Comment
                <textarea placeholder="Comparte tus pensamientos..." rows="3"></textarea>
            </label>
            <button type="submit">Submit Review</button>
        </form>
    </div>
</div>
);
}

export default Valoracion;

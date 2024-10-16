import axios from 'axios';
import { useEffect, useState } from 'react';
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

const datosRecuperados = JSON.parse(sessionStorage.getItem('datosUsuario'));

function Valoracion() {
    const [contactodelacuenta, setcontactodelacuenta] = useState(0);
    const [comentarios, setComentarios] = useState([]); // Mover la declaración al principio
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [promedio, setPromedio] = useState(0);

    // Se añadió el estado de error para manejar errores
    const [error, setError] = useState(null); // CORREGIDO: Declarar el estado de error

    const buscarUsuario = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuarios/contacto-por-email?email=${datosRecuperados.email}`);
            setcontactodelacuenta(response.data);
        } catch (err) {
            // Maneja el error
            setError(err.response ? err.response.data : 'Error al buscar usuario'); // CORREGIDO: Usar el estado de error
            setcontactodelacuenta(null); // CORREGIDO: Cambiar setContacto a setcontactodelacuenta
        }
    };

    useEffect(() => {
        buscarUsuario(); // CORREGIDO: Llamar a buscarUsuario dentro de useEffect
    }, []); // CORREGIDO: Agregar [] para evitar bucles infinitos

    const obtenerUsuario1 = async () => {
        try {
            const response = await axios.get(`/api/comentarioCanciones/cancion/${textoCompartidoCancion.id}`);
            setComentarios(response.data);

        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
        }
    };
    const obtenerPromedio = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/comentarioCanciones/promedio/${textoCompartidoCancion.id}`);
            setPromedio(response.data); // Actualiza el estado del promedio
        } catch (error) {
            console.error('Error al obtener el promedio:', error);
        }

    };
    useEffect(() => {
        obtenerPromedio();
    }, [textoCompartidoCancion.id]);

    const obtenerIniciales = (nombre) => {
        return nombre
            .split(" ")
            .map((n) => n[0])
            .join("");
    };

    setTextoCompartidoAudio(textoCompartidoCancion.audioCancion);

    useEffect(() => {
        obtenerUsuario1();
    }, [textoCompartidoCancion.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(comment, rating, contactodelacuenta, textoCompartidoCancion.id);
        const comentarioData = {
            comentarios: comment,
            calificacion: rating,
            fechaComentario: new Date().toISOString(),
            usuario: {
                contacto: contactodelacuenta,
            },
            cancion: {
                id: textoCompartidoCancion.id,
            },
        };

        try {
            const response = await axios.post('http://localhost:8080/api/comentarioCanciones', comentarioData);
            console.log('Comentario enviado:', response.data);
            setComment('');
            obtenerUsuario1();
            obtenerPromedio();
        } catch (error) {
            console.error('Error al enviar el comentario:', error);
        }
    }

    return (
        <div className={styles['container']}>
            <div className={styles['video-container']}>
                <img src={textoCompartidoCancion.imageUrl} style={{ width: '760px' }} alt="Album Cover2" />
                <AudioPlayer />
                <div className={styles['video-info']}>
                    <h2>{textoCompartidoCancion.tituloCancion}</h2>
                    <div className={styles['rating']}>
                        {(() => {
                            const stars = [];
                            const filledStars = Math.floor(promedio); // Número de estrellas llenas
                            const totalStars = 5; // Total de estrellas a mostrar

                            for (let i = 0; i < totalStars; i++) {
                                if (i < filledStars) {
                                    stars.push(
                                        <span key={i} className={`${styles['star']} ${styles['filled']}`} style={{ color: '#ffc107' }}>&#9733;</span> // Estrella llena amarilla
                                    );
                                } else {
                                    stars.push(
                                        <span key={i} className={styles['star']} style={{ color: '#e4e5e9' }}>&#9734;</span> // Estrella vacía gris
                                    );
                                }
                            }
                            return stars;
                        })()}
                        <span> {promedio.toFixed(1)}</span>
                    </div>
                </div>
            </div>

            <div className={styles['comments-section']}>
                <h3>Comentarios</h3>
                <div className={styles['comments-container']}>
                    <div>
                        {comentarios.map((comentario, index) => (
                            <div key={index} className={styles['comment']}>
                                <div className={styles['avatar']}>
                                    {obtenerIniciales(comentario.usuario.nombreUsuario)}
                                </div>
                                <div className={styles['comment-content']}>
                                    <strong>@{comentario.usuario.nombreUsuario}</strong>
                                    <p>{comentario.comentarios}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles['review-section']}>
                <h3>Deja una reseña</h3>
                <form className={styles['review-form']} onSubmit={handleSubmit}>
                    <label>Rating
                        <div className={styles['rating']}>
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <span
                                        key={ratingValue}
                                        className={styles['star']}
                                        style={{ color: ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9' }}
                                        onClick={() => setRating(ratingValue)}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}>☆
                                    </span>
                                );
                            })}
                        </div>
                    </label>
                    <label>Commentario
                        <textarea placeholder="Comparte tus pensamientos..." rows="3" value={comment} onChange={(e) => setComment(e.target.value)}></textarea> {/* CORREGIDO: Añadido el valor y onChange al textarea */}
                    </label>
                    <StyledButton type="submit">Submit Review</StyledButton>
                </form>
            </div>
        </div>
    );
}

export default Valoracion;
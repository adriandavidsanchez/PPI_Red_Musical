import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AudioPlayer from '../AudioPlayer';
import styles from './valoracion_contenido.module.css';

const BotonEstilizado = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

function Valoracion() {
    
    const [datosCancion, establecerDatosCancion] = useState([]);
    const [contactoCuenta, establecerContactoCuenta] = useState(0);
    const [comentarios, establecerComentarios] = useState([]);
    const [calificacion, establecerCalificacion] = useState(0);
    const [hover, establecerHover] = useState(0);
    const [comentario, establecerComentario] = useState('');
    const [promedio, establecerPromedio] = useState(0);
    const [error, establecerError] = useState(null);

    
    const datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'));

    
    const obtenerIniciales = (nombre) => {
        return nombre
            .split(" ")
            .map((n) => n[0])
            .join("");
    };

    // Métodos de obtención de datos
    const obtenerDatosIniciales = async () => {
        try {
            // Obtener datos de la canción
            const cancion = JSON.parse(sessionStorage.getItem('DatosCancion'));
            establecerDatosCancion(cancion || []);

            if (cancion?.id) {
                // Obtener comentarios y promedio
                const [comentariosRes, promedioRes, contactoRes] = await Promise.all([
                    axios.get(`/api/comentarioCanciones/cancion/${cancion.id}`),
                    axios.get(`http://localhost:8080/api/comentarioCanciones/promedio/${cancion.id}`),
                    axios.get(`http://localhost:8080/api/usuarios/contacto-por-email?email=${datosUsuario.email}`)
                ]);

                establecerComentarios(comentariosRes.data);
                establecerPromedio(promedioRes.data);
                establecerContactoCuenta(contactoRes.data);
            }
        } catch (err) {
            establecerError(err.response?.data || 'Error al cargar los datos');
            console.error('Error al cargar los datos:', err);
        }
    };

    // Efecto inicial para cargar todos los datos
    useEffect(() => {
        obtenerDatosIniciales();
    }, []);

    // Manejador de envío de comentarios
    const manejarEnvioComentario = async (evento) => {
        evento.preventDefault();

        const nuevoComentario = {
            comentarios: comentario,
            calificacion: calificacion,
            fechaComentario: new Date().toISOString(),
            usuario: {
                contacto: contactoCuenta,
            },
            cancion: {
                id: datosCancion.id,
            },
        };

        try {
            await axios.post('http://localhost:8080/api/comentarioCanciones', nuevoComentario);
            establecerComentario('');
            obtenerDatosIniciales(); // Actualiza comentarios y promedio
        } catch (error) {
            console.error('Error al enviar el comentario:', error);
            establecerError('Error al enviar el comentario');
        }
    };

    // Componente de estrellas para mostrar calificación
    const EstrellasPuntuacion = ({ puntuacion, total = 5, estatica = true }) => {
        return [...Array(total)].map((_, index) => {
            const valor = index + 1;
            return (
                <span
                    key={valor}
                    className={styles['star']}
                    style={{
                        color: estatica 
                            ? (valor <= Math.floor(puntuacion) ? '#ffc107' : '#e4e5e9')
                            : (valor <= (hover || calificacion) ? '#ffc107' : '#e4e5e9')
                    }}
                    onClick={() => !estatica && establecerCalificacion(valor)}
                    onMouseEnter={() => !estatica && establecerHover(valor)}
                    onMouseLeave={() => !estatica && establecerHover(0)}
                >
                    {estatica ? (valor <= Math.floor(puntuacion) ? '★' : '☆') : '☆'}
                </span>
            );
        });
    };

    return (
        <div className={styles['container']}>
            <div className={styles['video-container']}>
                <img 
                    src={datosCancion.imageUrl} 
                    style={{ width: '760px' }} 
                    alt="Portada del álbum" 
                />
                <AudioPlayer />
                <div className={styles['video-info']}>
                    <h2>{datosCancion.tituloCancion}</h2>
                    <div className={styles['rating']}>
                        <EstrellasPuntuacion puntuacion={promedio} />
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
                                    {"User"}
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
                <form className={styles['review-form']} onSubmit={manejarEnvioComentario}>
                    <label>
                        Calificación
                        <div className={styles['rating']}>
                            <EstrellasPuntuacion 
                                puntuacion={calificacion} 
                                estatica={false} 
                            />
                        </div>
                    </label>
                    <label>
                        Comentario
                        <textarea 
                            placeholder="Comparte tus pensamientos..." 
                            rows="3" 
                            value={comentario} 
                            onChange={(e) => establecerComentario(e.target.value)}
                        />
                    </label>
                    <BotonEstilizado type="submit">
                        Enviar Reseña
                    </BotonEstilizado>
                </form>
            </div>
        </div>
    );
}

export default Valoracion;
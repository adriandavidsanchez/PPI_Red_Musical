import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { setTextoCompartido } from '../../Variables.jsx';
import styles from './Carrucel.module.css';



const genres = [
  'Rock', 'Salsa', 'Joropo', 'Pop', 'Jazz', 'Clásica',
  'Reggaeton', 'Hip Hop', 'Tango', 'Electrónica','Personalizado'
];



const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const GenresCarousel = () => {
  
  const navigate = useNavigate();

  const genreChunks = chunkArray(genres, 5);

  const handleCardClick = (genre) => {
    console.log(`Clicked on: ${genre}`);
    setTextoCompartido(genre)
    navigate('/detalle');
    
  };

  return (
    <div className={styles['genres-section12']} style={{ marginLeft: '250px', marginRight: '250px' }}>
      <h2 className="mb-4">Generos</h2>
      <Carousel interval={2000}>
        {genreChunks.map((chunk, chunkIndex) => (
          <Carousel.Item key={chunkIndex}>
            <div className={`d-flex justify-content-around align-items-center`} style={{ height: '140px' }}>
              {chunk.map((genre, genreIndex) => (
                <Card
                  key={genreIndex}
                  className={`${styles['genre-card12']} p-2`}
                  style={{ width: '260px', height: '120px', cursor: 'pointer' }}
                  onClick={() => handleCardClick(genre)}
                  
                >
                  <Card.Body className={`d-flex justify-content-center align-items-center`}>
                    <div className={styles['icon-text-container44']}>
                      <svg data-id="35" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="black"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary" style={{ marginBottom: '10px' }}>
                        <circle cx="8" cy="18" r="4"></circle>
                        <path d="M12 18V2l7 4"></path>
                      </svg>
                      <h3 className="m-0">{genre}</h3>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Estilos adicionales en línea */}
      <style>
        {`
          .carousel-control-prev {
            left: -30px;
            transform: translateX(-100%);
          }
          .carousel-control-next {
            right: -30px;
            transform: translateX(100%);
          }
          .carousel-indicators {
            display: none;
          }
          .container44 {
            position: relative;
            display: flex;
            align-items: center;
          }
          .card {
            background-color: #f3f4f6;
          }
          .genre-card12 .card-body {
            padding: 10px;
            background-color: #f3f4f6;
          }
          h3.m-0 {
            margin: 0;
            font-size: 20px;
            font-weight: normal;
          }
          .carousel-control-prev, .carousel-control-next {
            filter: invert(1);
          }
        `}
      </style>
    </div>
  );
};

export default GenresCarousel;

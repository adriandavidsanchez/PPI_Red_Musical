import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Carousel } from 'react-bootstrap';
import './Carrucel.css';
// Lista de géneros
const genres = [
  'Rock', 'Salsa', 'Joropo', 'Pop', 'Jazz', 'Clásica',
  'Reggaeton', 'Hip Hop', 'Tango', 'Electrónica'
];

// Función para dividir el array en bloques de tamaño `size`
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const GenresCarousel = () => {
  // Divide los géneros en bloques de 5
  const genreChunks = chunkArray(genres, 5);

  return (
    <div className="genres-section12" style={{ marginLeft: '250px',marginRight: '250px'}}>
      <h2 className="mb-4">Genres</h2>
      <Carousel>
        {genreChunks.map((chunk, chunkIndex) => (
          <Carousel.Item key={chunkIndex}>
            <div className="d-flex justify-content-around align-items-center" style={{height: '140px'}}>
              {chunk.map((genre, genreIndex) => (
                <Card key={genreIndex} className="genre-card12 p-2" style={{ width: '260px', height: '120px' }}>
                  <Card.Body className="d-flex justify-content-center align-items-center" >
                    <div className="icon-text-container44">
                    <svg data-id="35" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="black"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary" style={{marginBottom: '10px'}}><circle cx="8" cy="18" r="4"></circle><path 
                    d="M12 18V2l7 4"></path></svg>
                    <h3 className="m-0">{genre}</h3>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default GenresCarousel;

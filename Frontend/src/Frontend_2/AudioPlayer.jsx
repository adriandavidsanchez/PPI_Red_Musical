import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from 'react';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const NombreAudio = JSON.parse(sessionStorage.getItem('NombreCancion'));
  const almacenamiento = getStorage();
  
  const [urlArchivo, setUrlArchivo] = useState('/src/assets/imagenes/gestion-prueva/dis5.mp3');
  const [estaReproduciendo, setEstaReproduciendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [duracionTotal, setDuracionTotal] = useState(0);
  const [tiempoActual, setTiempoActual] = useState(0);
  
  const referenciaAudio = useRef(null);
  const referenciaProgreso = useRef(null);

  useEffect(() => {
    if (NombreAudio) {
      const referenciaArchivo = ref(almacenamiento, `Audio/${NombreAudio}`);
      getDownloadURL(referenciaArchivo).then((url) => {
        setUrlArchivo(url);
        console.log('URL de descarga:', url);
      }).catch((error) => {
        console.error('Error al obtener la URL:', error);
      });
    }
  }, [NombreAudio, almacenamiento]);

  useEffect(() => {
    const audio = referenciaAudio.current;
    if (audio) {
      audio.load();
      setEstaReproduciendo(false);
      setProgreso(0);
      setTiempoActual(0);
      setDuracionTotal(0);
    }
  }, [urlArchivo]);

  const formatearTiempo = (tiempo) => {
    const minutos = Math.floor(tiempo / 60);
    const segundos = Math.floor(tiempo % 60);
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  };

  useEffect(() => {
    const audio = referenciaAudio.current;

    const actualizarProgreso = () => {
      if (audio.duration) {
        setProgreso((audio.currentTime / audio.duration) * 100);
        setTiempoActual(audio.currentTime);
      }
    };

    const establecerDuracion = () => setDuracionTotal(audio.duration);

    audio.addEventListener('timeupdate', actualizarProgreso);
    audio.addEventListener('loadedmetadata', establecerDuracion);

    return () => {
      audio.removeEventListener('timeupdate', actualizarProgreso);
      audio.removeEventListener('loadedmetadata', establecerDuracion);
    };
  }, []);

  const alternarReproduccion = () => {
    const audio = referenciaAudio.current;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    setEstaReproduciendo(!estaReproduciendo);
  };

  const manejarClicProgreso = (e) => {
    const barraProgreso = referenciaProgreso.current;
    const rectangulo = barraProgreso.getBoundingClientRect();
    const clicX = e.clientX - rectangulo.left;
    const nuevoProgreso = (clicX / rectangulo.width) * 100;
    const audio = referenciaAudio.current;
    audio.currentTime = (nuevoProgreso / 100) * audio.duration;
    setProgreso(nuevoProgreso);
  };

  const manejarArrastre = (e) => {
    manejarClicProgreso(e);
  };

  return (
    <div className="reproductor-audio">
      <audio ref={referenciaAudio} src={urlArchivo}>
        Tu navegador no soporta el elemento de audio.
      </audio>

      <button onClick={alternarReproduccion}>
        {estaReproduciendo ? 'Pausar' : 'Reproducir'}
      </button>

      <div 
        className="barra-progreso"
        ref={referenciaProgreso}
        onClick={manejarClicProgreso}
        onDrag={manejarArrastre}
      >
        <div 
          className="progreso"
          style={{ width: `${progreso}%` }}
        />
      </div>

      <div className="mostrar-tiempo">
        {formatearTiempo(tiempoActual)} / {formatearTiempo(duracionTotal)}
      </div>
    </div>
  );
};

export default AudioPlayer;
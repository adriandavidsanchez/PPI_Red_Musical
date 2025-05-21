import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './seleccion_contenido.module.css';

const FavoriteButton = ({ cancionId }) => {
  const [esFavorito, setEsFavorito] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [listaId, setListaId] = useState(null);

  // 1️⃣ Al montar: obtener el email del usuario desde sessionStorage
  useEffect(() => {
    try {
      const datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'));
      if (datosUsuario && datosUsuario.email) {
        setUserEmail(datosUsuario.email);
      } else {
        console.error('No se encontró el email del usuario en sessionStorage');
        setCargando(false);
      }
    } catch (err) {
      console.error('Error obteniendo datos del usuario:', err);
      setCargando(false);
    }
  }, []);

  // 2️⃣ Cuando tenemos el email, obtenemos el ID del usuario (contacto)
  useEffect(() => {
    if (!userEmail) return;
    
    (async () => {
      try {
        // Obtenemos el ID del usuario usando el email
        const resUsuario = await axios.get(`http://localhost:8080/api/usuarios/contacto-por-email?email=${userEmail}`);
        setUserId(resUsuario.data);
      } catch (err) {
        console.error('Error obteniendo ID del usuario:', err);
      }
    })();
  }, [userEmail]);

  // 3️⃣ Cuando tenemos el userId, obtenemos la lista del usuario
  useEffect(() => {
    if (!userId) return;
    
    (async () => {
      try {
        // Obtenemos la lista del usuario
        const resLista = await axios.get(`http://localhost:8080/api/listaReproduccion/usuario/${userId}`);
        if (resLista.data) {
          setListaId(resLista.data.idLista);
        }
      } catch (err) {
        console.error('Error obteniendo lista del usuario:', err);
      }
    })();
  }, [userId]);

  // 4️⃣ Cuando ya tenemos userEmail y cancionId, verificamos si es favorito
  useEffect(() => {
    if (!userEmail || !cancionId) return;
    
    (async () => {
      setCargando(true);
      try {
        // Usamos el endpoint que verifica si la canción existe en la lista del usuario
        const res = await axios.get(
          `http://localhost:8080/api/usuario/${userEmail}/cancion/${cancionId}/existe`
        );
        setEsFavorito(res.data);
      } catch (err) {
        console.error('Error verificando favorito:', err);
      } finally {
        setCargando(false);
      }
    })();
  }, [userEmail, cancionId]);

  // 5️⃣ Alternar favorito: agregar o eliminar de la lista
  const alternarFavorito = async () => {
    if (!listaId || !cancionId) return;
    
    setCargando(true);
    try {
      if (esFavorito) {
        // Eliminar de la lista usando ID de lista y ID de canción
        await axios.delete(
          `http://localhost:8080/api/listaReproduccion/${listaId}/eliminar/${cancionId}`
        );
        setEsFavorito(false);
      } else {
        // Agregar a la lista usando ID de lista y ID de canción
        await axios.post(
          `http://localhost:8080/api/listaReproduccion/${listaId}/agregar/${cancionId}`
        );
        setEsFavorito(true);
      }
    } catch (err) {
      console.error('Error actualizando favorito:', err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <button 
      className={`${styles['favorite-button']} ${esFavorito ? styles['favorite-active'] : ''}`} 
      onClick={alternarFavorito} 
      disabled={cargando}
    >
      {cargando ? '...' : esFavorito ? 'Eliminar' : 'Agregar'}
    </button>
  );
};

export default FavoriteButton;
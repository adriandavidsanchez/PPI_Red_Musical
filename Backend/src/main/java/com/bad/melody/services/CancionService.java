package com.bad.melody.services;

import java.util.List;

import com.bad.melody.model.Cancion;

public interface CancionService {
    List<Cancion> obtenerLasCanciones();
    
    Cancion obtenerCancionPorId(Long id);
    
    Cancion guardarCancion(Cancion cancionNueva);
    
    Cancion actualizarCancion(Long id, Cancion cancionActualizar);
    
    Long contarCanciones();
    
    boolean eliminarCancion(Long id);
}
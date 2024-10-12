package com.bad.melody.services;

import java.util.List;

import com.bad.melody.model.Cancion;
import com.bad.melody.model.Genero;

public interface CancionService {
    List<Cancion> obtenerLasCanciones();

    List<Cancion> obtenerUltimasDosCanciones();

    Cancion obtenerCancionPorId(Long id);
    
    Cancion guardarCancion(Cancion cancionNueva);
    
    Cancion actualizarCancion(Long id, Cancion cancionActualizar);
    
    Long contarCanciones();
    
    boolean eliminarCancion(Long id);

    List<Long> obtenerIdsCancionesPorGenero(Genero genero);

    List<Cancion> obtenerCancionesPorGeneroOrdenadasPorCalificacion(Genero genero);
;
    List<Cancion> obtenerCancionesPorContactoArtista(Long contacto);
}
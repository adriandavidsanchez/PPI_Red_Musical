package com.bad.melody.services;

import java.util.List;

import com.bad.melody.model.Cancion;

public interface CancionService {

    List<Cancion> obtenerLasCanciones();

    Cancion obtenerCancionPorId (Long id);

    Cancion ingresarCancionNueva (Cancion CancionNueva);

    Cancion actualizarCancion (Long id, Cancion CancionActualizar);

    Long contarCanciones ();

    void eliminarCancion (Long id);

}

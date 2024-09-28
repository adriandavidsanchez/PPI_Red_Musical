package com.bad.melody.services;

import java.util.List;

import com.bad.melody.model.HistorialReproducion;

public interface HistorialReproducionService {

    List<HistorialReproducion> obtenerTodosHistorialesReproduciones ();

    Long contarHiistorialessReproducion ();

    void eliminarHirialPorId(Long id);

    HistorialReproducion nuevoHistorialReproducion (Long id, HistorialReproducion nuevoHistorialReproducion);
}

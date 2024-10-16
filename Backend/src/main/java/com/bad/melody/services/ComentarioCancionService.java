package com.bad.melody.services;

import java.util.List;
import java.util.Map;

import com.bad.melody.model.ComentarioCancion;

public interface ComentarioCancionService {
    List<ComentarioCancion> obtenerTodosComentarios();
    ComentarioCancion crearComentario(ComentarioCancion comentarioCancion);
    ComentarioCancion obtenerComentarioPorId(Long id);
    ComentarioCancion actualizarComentario(Long id, ComentarioCancion comentarioCancion);
    void eliminarComentario(Long id);
    List<Map<String, Object>> obtenerComentariosPorCancionId(Long cancionId);
    double obtenerPromedioCalificacionesPorCancionId(Long cancionId);
}

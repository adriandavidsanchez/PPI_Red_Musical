package com.bad.melody.services.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.OptionalDouble;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bad.melody.model.ComentarioCancion;
import com.bad.melody.repository.ComentarioCancionRepository;
import com.bad.melody.services.ComentarioCancionService;

@Service
public class ComentarioCancionServiceImpl implements ComentarioCancionService {
    @Autowired
    private ComentarioCancionRepository comentarioCancionRepository;

    @Override
    public List<ComentarioCancion> obtenerTodosComentarios() {
        return comentarioCancionRepository.findAll();
    }

    @Override
    public ComentarioCancion crearComentario(ComentarioCancion comentarioCancion) {
        return comentarioCancionRepository.save(comentarioCancion);
    }

    @Override
    public ComentarioCancion obtenerComentarioPorId(Long id) {
        return comentarioCancionRepository.findById(id).orElse(null);
    }

    @Override
    public ComentarioCancion actualizarComentario(Long id, ComentarioCancion comentarioCancion) {
        comentarioCancion.setId(id);
        return comentarioCancionRepository.save(comentarioCancion);
    }

    @Override
    public void eliminarComentario(Long id) {
        comentarioCancionRepository.deleteById(id);
    }

    public ComentarioCancionServiceImpl(ComentarioCancionRepository comentarioCancionRepository) {
        this.comentarioCancionRepository = comentarioCancionRepository;
    }

    @Override
    public List<Map<String, Object>> obtenerComentariosPorCancionId(Long cancionId) {
        List<ComentarioCancion> comentarios = comentarioCancionRepository.findByCancionId(cancionId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (ComentarioCancion comentario : comentarios) {
            Map<String, Object> comentarioMap = new HashMap<>();
            comentarioMap.put("comentarios", comentario.getComentarios());
            comentarioMap.put("calificacion", comentario.getCalificacion());
            comentarioMap.put("fechaComentario", comentario.getFechaComentario());

            // Detalles del usuario
            Map<String, Object> usuarioMap = new HashMap<>();
            usuarioMap.put("nombreUsuario", comentario.getUsuario().getNombre()); // Ajustar al atributo correcto
            usuarioMap.put("contactoUsuario", comentario.getUsuario().getContacto());
            comentarioMap.put("usuario", usuarioMap);

            // Detalles de la canción (si los quieres también)
            Map<String, Object> cancionMap = new HashMap<>();
            cancionMap.put("tituloCancion", comentario.getCancion().getTituloCancion());
            comentarioMap.put("cancion", cancionMap);

            result.add(comentarioMap);
        }
        return result;
    }

    @Override
    public double obtenerPromedioCalificacionesPorCancionId(Long cancionId) {
        List<ComentarioCancion> comentarios = comentarioCancionRepository.findByCancionId(cancionId);
        OptionalDouble promedio = comentarios.stream()
                .mapToInt(ComentarioCancion::getCalificacion)
                .average();
        return promedio.orElse(0); // Retorna 0 si no hay comentarios
    }

}
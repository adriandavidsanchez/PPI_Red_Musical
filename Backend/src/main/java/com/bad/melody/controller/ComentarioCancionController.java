package com.bad.melody.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bad.melody.model.ComentarioCancion;
import com.bad.melody.services.ComentarioCancionService;

@RestController
@RequestMapping("/api/comentarioCanciones")
public class ComentarioCancionController {


    @Autowired
    private ComentarioCancionService comentarioCancionService;

    // Obtener todos los comentarios
    @GetMapping
    public ResponseEntity<List<ComentarioCancion>> obtenerTodosComentarios() {
        List<ComentarioCancion> comentarios = comentarioCancionService.obtenerTodosComentarios();
        return new ResponseEntity<>(comentarios, HttpStatus.OK);
    }

    @GetMapping("/cancion/{cancionId}")
    public ResponseEntity<List<Map<String, Object>>> obtenerComentariosPorCancionId(@PathVariable Long cancionId) {
        List<Map<String, Object>> comentarios = comentarioCancionService.obtenerComentariosPorCancionId(cancionId);
        return new ResponseEntity<>(comentarios, HttpStatus.OK);
    }
    // Crear un nuevo comentario
    @PostMapping
    public ResponseEntity<ComentarioCancion> crearComentario(@RequestBody ComentarioCancion comentarioCancion) {
        ComentarioCancion nuevoComentario = comentarioCancionService.crearComentario(comentarioCancion);
        return new ResponseEntity<>(nuevoComentario, HttpStatus.CREATED);
    }

    // Obtener comentario por ID

    @GetMapping("/{id}")
    public ResponseEntity<ComentarioCancion> obtenerComentarioPorId(@PathVariable Long id) {
        ComentarioCancion comentario = comentarioCancionService.obtenerComentarioPorId(id);
        return ResponseEntity.ok(comentario);
    }
    // Actualizar un comentario
    @PutMapping("/{id}")
    public ResponseEntity<ComentarioCancion> actualizarComentario(@PathVariable Long id, @RequestBody ComentarioCancion comentarioCancion) {
        ComentarioCancion comentarioActualizado = comentarioCancionService.actualizarComentario(id, comentarioCancion);
        return new ResponseEntity<>(comentarioActualizado, HttpStatus.OK);
    }

    // Eliminar un comentario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarComentario(@PathVariable Long id) {
        comentarioCancionService.eliminarComentario(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/promedio/{cancionId}")
    public ResponseEntity<Double> obtenerPromedioCalificacionesPorCancionId(@PathVariable Long cancionId) {
        double promedio = comentarioCancionService.obtenerPromedioCalificacionesPorCancionId(cancionId);
        return new ResponseEntity<>(promedio, HttpStatus.OK);
    }
}
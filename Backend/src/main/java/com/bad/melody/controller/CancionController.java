package com.bad.melody.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bad.melody.model.Cancion;
import com.bad.melody.model.Genero;
import com.bad.melody.services.CancionService;

@RestController
@RequestMapping("/api/canciones")
@CrossOrigin(origins = "*")
public class CancionController {

    @Autowired
    private CancionService cancionService;

    // Obtener todas las canciones
    @GetMapping
    public ResponseEntity<List<Cancion>> obtenerTodasLasCanciones() {
        List<Cancion> canciones = cancionService.obtenerLasCanciones();
        return new ResponseEntity<>(canciones, HttpStatus.OK);
    }

    // Obtener una canción por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cancion> obtenerCancionPorId(@PathVariable Long id) {
        try {
            Cancion cancion = cancionService.obtenerCancionPorId(id);
            return new ResponseEntity<>(cancion, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Crear una nueva canción
    @PostMapping
    public ResponseEntity<Cancion> crearCancion(@RequestBody Cancion cancion) {
        try {
            Cancion nuevaCancion = cancionService.guardarCancion(cancion);
            return new ResponseEntity<>(nuevaCancion, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Actualizar una canción
    @PutMapping("/{id}")
    public ResponseEntity<Cancion> actualizarCancion(@PathVariable Long id, @RequestBody Cancion cancion) {
        try {
            Cancion cancionActualizada = cancionService.actualizarCancion(id, cancion);
            return new ResponseEntity<>(cancionActualizada, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar una canción
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCancion(@PathVariable Long id) {
        try {
            boolean eliminado = cancionService.eliminarCancion(id);
            if (eliminado) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Obtener el total de canciones
    @GetMapping("/count")
    public ResponseEntity<Long> contarCanciones() {
        Long total = cancionService.contarCanciones();
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    @GetMapping("/ultimas-dos")
    public ResponseEntity<List<Long>> obtenerIdsUltimasDosCanciones() {
        List<Cancion> ultimasDosCanciones = cancionService.obtenerUltimasDosCanciones();
        List<Long> ids = ultimasDosCanciones.stream()
                                            .map(Cancion::getId)  // Obtiene los IDs
                                            .collect(Collectors.toList());
        return new ResponseEntity<>(ids, HttpStatus.OK);
    }
    @GetMapping("/por-genero/{idGenero}")
    public List<Cancion> obtenerCancionesPorGenero(@PathVariable Long idGenero) {
        Genero genero = new Genero();
        genero.setId(idGenero);
    
        // Llama al servicio para obtener las canciones ordenadas por calificación promedio
        return cancionService.obtenerCancionesPorGeneroOrdenadasPorCalificacion(genero);
    }
}
package com.bad.melody.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bad.melody.model.Cancion;
import com.bad.melody.model.Lista;
import com.bad.melody.services.impl.ListaReproducionServiceImple;



@RestController
@RequestMapping("/api/listaReproduccion")
public class ListaReproducionController {

    @Autowired
    private ListaReproducionServiceImple listaReproducionServiceImpl;

    @PostMapping("/{idLista}/agregar/{idCancion}")
    public ResponseEntity<String> agregarCancion(@PathVariable Long idLista, @PathVariable Long idCancion) {
        try {
            listaReproducionServiceImpl.agregarCancion(idLista, idCancion);
            return ResponseEntity.ok("Canción agregada a la lista de reproducción");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al agregar la canción: " + e.getMessage());
        }
    }

    @DeleteMapping("/{idLista}/eliminar/{idCancion}")
    public ResponseEntity<String> eliminarCancion(@PathVariable Long idLista, @PathVariable Long idCancion) {
        try {
            listaReproducionServiceImpl.eliminarCancion(idLista, idCancion);
            return ResponseEntity.ok("Canción eliminada de la lista de reproducción");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al eliminar la canción: " + e.getMessage());
        }
    }

    @PostMapping("/crear")
    public ResponseEntity<Lista> crearLista(@RequestParam Long idUsuario, @RequestParam String nombreLista) {
        try {
            Lista lista = listaReproducionServiceImpl.crearLista(idUsuario, nombreLista);
            return ResponseEntity.status(HttpStatus.CREATED).body(lista);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

        @GetMapping("/usuario/{idUsuario}/canciones")
    public ResponseEntity<List<Cancion>> getCancionesPorUsuario(@PathVariable Long idUsuario) {
        List<Cancion> canciones = listaReproducionServiceImpl.obtenerCancionesPorUsuario(idUsuario);
        return ResponseEntity.ok(canciones);
    }
}

package com.bad.melody.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bad.melody.services.impl.ListaReproducionServiceImple;



@RestController
@RequestMapping("/lista")
public class ListaReproducionController {

    @Autowired
    private ListaReproducionServiceImple listaReproducionServiceImpl;

    @PostMapping("/{idLista}/agregar/{idCancion}")
    public ResponseEntity<String> agregarCancion(Long idLista, Long idCancion) {
        try {
            listaReproducionServiceImpl.agregarCancion(idLista, idCancion);
            return ResponseEntity.ok("Canción agregada a la lista de reproducción");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al agregar la canción: " + e.getMessage());
        }
    }

    @DeleteMapping("/{idLista}/eliminar/{idCancion}")
    public ResponseEntity<String> eliminarCancion(Long idLista, Long idCancion) {
        try {
            listaReproducionServiceImpl.eliminarCancion(idLista, idCancion);
            return ResponseEntity.ok("Canción eliminada de la lista de reproducción");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al eliminar la canción: " + e.getMessage());
        }
    }
}

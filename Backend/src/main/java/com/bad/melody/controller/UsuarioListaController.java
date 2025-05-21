// src/main/java/com/bad/melody/controller/UsuarioListaController.java
package com.bad.melody.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bad.melody.services.ListaReproducionService;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioListaController {

    @Autowired
    private ListaReproducionService listaReproducionService;

    /**
     * Comprueba si la canción idCancion ya existe en la lista del usuario email
     * GET /api/usuario/{email}/cancion/{idCancion}/existe
     */
    @GetMapping("/{email}/cancion/{idCancion}/existe")
    public ResponseEntity<Boolean> existeCancionEnLista(
            @PathVariable String email,
            @PathVariable Long idCancion) {
        boolean existe = listaReproducionService.existeCancionEnListaPorEmail(email, idCancion);
        return ResponseEntity.ok(existe);
    }
}

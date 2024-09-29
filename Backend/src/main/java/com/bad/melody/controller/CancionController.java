package com.bad.melody.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bad.melody.model.Cancion;
import com.bad.melody.services.impl.CancionServiceImpl;;

@RestController
@RequestMapping("/api/canciones")
public class CancionController {

    @Autowired
    private CancionServiceImpl cancionServiceImpl;

    @DeleteMapping("/{id}")
    public String eliminarCancionPorId (@PathVariable("id") Long id){
        boolean verificar = this.cancionServiceImpl.eliminarCancion(id);
        if (verificar) {
            return "La cancion se elimino exitosamente";
        }else{
            return "No se pudo eliminar la cancion";
        }
    }

    @GetMapping
    public List<Cancion> obtenerTodasLasCanciones(){
        return cancionServiceImpl.obtenerLasCanciones();
    }

    
}

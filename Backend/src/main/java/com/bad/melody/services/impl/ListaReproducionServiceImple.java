package com.bad.melody.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bad.melody.model.Cancion;
import com.bad.melody.model.ListaReproduccionCancion;
import com.bad.melody.model.ListaReproducion;
import com.bad.melody.repository.CancionRepository;
import com.bad.melody.repository.ListaReproducionCancionRepository;
import com.bad.melody.repository.ListaReproducionRepository;
import com.bad.melody.services.ListaReproducionService;

@Service
public class ListaReproducionServiceImple implements ListaReproducionService {

    @Autowired
    private CancionRepository cancionRepository;

    @Autowired
    private ListaReproducionRepository listaReproducionRepository;

    @Autowired
    private ListaReproducionCancionRepository listaReproducionCancionRepository;

    @Override
    public void agregarCancion(Long idLista, Long idCancion) {
        ListaReproducion lista = listaReproducionRepository.findById(idLista)
                .orElseThrow(() -> new RuntimeException("Lista no encontrada"));
        Cancion cancion = cancionRepository.findById(idCancion)
                .orElseThrow(() -> new RuntimeException("Canción no encontrada"));

        ListaReproduccionCancion relacion = new ListaReproduccionCancion();
        relacion.setListaReproduccionLista(lista);
        relacion.setCancionListaReproduccion(cancion);

        lista.getCanciones().add(relacion);
        listaReproducionRepository.save(lista);
        
    }

    @Override
    public void eliminarCancion(Long idLista, Long idCancion) {
        ListaReproduccionCancion relacion = listaReproducionCancionRepository
                .findByLista_IdAndCancion_Id(idLista, idCancion)
                .orElseThrow(() -> new RuntimeException("Relación no encontrada"));

        listaReproducionCancionRepository.delete(relacion);
    }

}

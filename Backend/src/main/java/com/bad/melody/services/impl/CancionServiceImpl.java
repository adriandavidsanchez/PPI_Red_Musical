package com.bad.melody.services.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bad.melody.model.Cancion;
import com.bad.melody.model.Genero;
import com.bad.melody.model.Usuario;
import com.bad.melody.repository.CancionRepository;
import com.bad.melody.repository.GeneroRepository;
import com.bad.melody.repository.UsuarioRepository;
import com.bad.melody.services.CancionService;

@Service
public class CancionServiceImpl implements CancionService {


    @Autowired
    private CancionRepository cancionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private GeneroRepository generoRepository;

    @Override
    public List<Cancion> obtenerLasCanciones() {
        return cancionRepository.findAll();
    }

    @Override
    public Cancion obtenerCancionPorId(Long id) {
        return cancionRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Cancion no encontrada con id: " + id));
    }

    @Override
    public List<Cancion> obtenerUltimasDosCanciones() {
        // Asume que tienes una columna de "id" autoincremental que refleja el orden de inserción
        return cancionRepository.findTop2ByOrderByIdDesc();  // Ordena por id descendente y toma los dos primeros
    }
    
    @Override
    public Cancion guardarCancion(Cancion nuevaCancion) {
        Usuario usuarioExistente = usuarioRepository.findByContacto(nuevaCancion.getArtistaCancion().getContacto());
        Genero generoExistente = generoRepository.findById(nuevaCancion.getGeneroCancion().getId())
            .orElseThrow(() -> new NoSuchElementException("Género no encontrado"));

        nuevaCancion.setArtistaCancion(usuarioExistente);
        nuevaCancion.setGeneroCancion(generoExistente);

        return cancionRepository.save(nuevaCancion);
    }

    @Override
    public Cancion actualizarCancion(Long id, Cancion cancionActualizada) {
        Cancion cancionExistente = cancionRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Canción no encontrada"));

        cancionExistente.setTituloCancion(cancionActualizada.getTituloCancion());
        cancionExistente.setAudioCancion(cancionActualizada.getAudioCancion());
        cancionExistente.setVideoCancion(cancionActualizada.getVideoCancion());
        cancionExistente.setImagenCancion(cancionActualizada.getImagenCancion());
        cancionExistente.setArtistaCancion(cancionActualizada.getArtistaCancion());
        cancionExistente.setGeneroCancion(cancionActualizada.getGeneroCancion());

        return cancionRepository.save(cancionExistente);
    }

    @Override
    public Long contarCanciones() {
        return cancionRepository.count();
    }

    @Override
    public boolean eliminarCancion(Long id) {
        try {
            cancionRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Long> obtenerIdsCancionesPorGenero(Genero genero) {
        List<Cancion> canciones = cancionRepository.findByGeneroCancion(genero);
        return canciones.stream().map(Cancion::getId).collect(Collectors.toList());
    }


    @Override
    public List<Cancion> obtenerCancionesPorGeneroOrdenadasPorCalificacion(Genero genero) {
        return cancionRepository.findByGeneroCancionOrderByCalificacionPromedioDesc(genero);
    }
    
}
package com.bad.melody.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bad.melody.model.Cancion;
import com.bad.melody.model.ListaReproduccionCancion;
import com.bad.melody.model.ListaReproducion;
import com.bad.melody.model.Usuario;
import com.bad.melody.repository.CancionRepository;
import com.bad.melody.repository.ListaReproducionCancionRepository;
import com.bad.melody.repository.ListaReproducionRepository;
import com.bad.melody.repository.UsuarioRepository;
import com.bad.melody.services.ListaReproducionService;

@Service
public class ListaReproducionServiceImple implements ListaReproducionService {

    @Autowired
    private UsuarioRepository usuarioRepository;

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

    @Override
    public ListaReproducion crearLista(Long idUsuario, String nombreLista) {
        // Verificar si el usuario existe
        Usuario usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    // Verificar si el usuario ya tiene lista de reproducción
    // (asumiendo que un usuario solo puede tener una lista de reproducción)
    // Si el usuario ya tiene una lista, lanzar una excepción
    if (usuario.getListaReproduccion() != null) {
        throw new RuntimeException("El usuario ya tiene una lista de reproducción.");
    }

    // Crear nueva lista de reproducción
    ListaReproducion lista = new ListaReproducion();
    lista.setNombreListaReproduccion(nombreLista);
    lista.setUsuarioListaReproducion(usuario);

    // Guardar en la base de datos
    return listaReproducionRepository.save(lista);
    }

}

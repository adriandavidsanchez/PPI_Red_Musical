package com.bad.melody.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bad.melody.model.Cancion;
import com.bad.melody.model.Lista;
import com.bad.melody.model.ListaReproduccionCancion;
import com.bad.melody.model.Usuario;
import com.bad.melody.repository.CancionRepository;
import com.bad.melody.repository.ListaRepository;
import com.bad.melody.repository.ListaReproducionCancionRepository;
import com.bad.melody.repository.UsuarioRepository;
import com.bad.melody.services.ListaReproducionService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListaReproducionServiceImple implements ListaReproducionService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CancionRepository cancionRepository;

    @Autowired
    private ListaRepository listaReproducionRepository;

    @Autowired
    private ListaReproducionCancionRepository listaReproducionCancionRepository;

    @Override
    public void agregarCancion(Long idLista, Long idCancion) {
        Lista lista = listaReproducionRepository.findById(idLista)
                .orElseThrow(() -> new RuntimeException("Lista no encontrada"));
        Cancion cancion = cancionRepository.findById(idCancion)
                .orElseThrow(() -> new RuntimeException("Canción no encontrada"));

        ListaReproduccionCancion relacion = new ListaReproduccionCancion();
        relacion.setListaReproduccion(lista);
        relacion.setCancionListaReproduccion(cancion);

        lista.getCanciones().add(relacion);
        listaReproducionRepository.save(lista);
        
    }

    @Override
    public void eliminarCancion(Long idLista, Long idCancion) {
        ListaReproduccionCancion relacion = listaReproducionCancionRepository
                .findByListaReproduccion_IdListaAndCancionListaReproduccion_Id(idLista, idCancion)
                .orElseThrow(() -> new RuntimeException("Relación no encontrada"));

        listaReproducionCancionRepository.delete(relacion);
    }

    @Override
    public Lista crearLista(Long idUsuario, String nombreLista) {
    Usuario usuario = usuarioRepository.findById(idUsuario)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    Lista lista = new Lista();
    lista.setNombreLista(nombreLista);

    // 1) Asocia ambas entidades
    lista.setUsuarioListaReproducion(usuario);
    usuario.setListaUsuario(lista);

    // 2) Guarda al usuario (gracias a CascadeType.ALL también se persiste la lista)
    usuarioRepository.save(usuario);

    return lista;
}
    @Override
    public List<Cancion> obtenerCancionesPorUsuario(Long idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Lista lista = usuario.getListaUsuario();
        if (lista == null) {
            throw new RuntimeException("El usuario no tiene lista creada");
        }
        // obtiene las entidades intermedias y extrae solo las Cancion
        return lista.getCanciones().stream()
                    .map(ListaReproduccionCancion::getCancionListaReproduccion)
                    .collect(Collectors.toList());
    }


 @Override
    public boolean existeCancionEnListaPorEmail(String email, Long idCancion) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null || usuario.getListaUsuario() == null) {
            return false;
        }
        return usuario.getListaUsuario()
                      .getCanciones()
                      .stream()
                      .anyMatch(r -> r.getCancionListaReproduccion().getId().equals(idCancion));
    }


    @Override
    public Lista obtenerListaPorUsuario(Long idUsuario) {
    Usuario usuario = usuarioRepository.findById(idUsuario)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    return usuario.getListaUsuario(); // puede devolver null si no tiene lista
}


}

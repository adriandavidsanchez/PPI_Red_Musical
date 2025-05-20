package com.bad.melody.services;

import java.util.List;

import com.bad.melody.model.Cancion;
import com.bad.melody.model.Lista;

public interface ListaReproducionService {

    public void agregarCancion(Long idLista, Long idCancion);

    public void eliminarCancion(Long idLista, Long idCancion);

    public Lista crearLista(Long idUsuario, String nombreLista);

    public List<Cancion> obtenerCancionesPorUsuario(Long idUsuario);
}

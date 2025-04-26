package com.bad.melody.services;

import com.bad.melody.model.ListaReproducion;

public interface ListaReproducionService {

    public void agregarCancion(Long idLista, Long idCancion);

    public void eliminarCancion(Long idLista, Long idCancion);

    public ListaReproducion crearLista(Long idUsuario, String nombreLista);
}

package com.bad.melody.services;

import com.bad.melody.model.ListaReproduccion;

public interface ListaReproducionService {

    public void agregarCancion(Long idLista, Long idCancion);

    public void eliminarCancion(Long idLista, Long idCancion);

    public ListaReproduccion crearLista(Long idUsuario, String nombreLista);
}

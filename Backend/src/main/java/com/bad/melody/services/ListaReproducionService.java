package com.bad.melody.services;

import com.bad.melody.model.Lista;

public interface ListaReproducionService {

    public void agregarCancion(Long idLista, Long idCancion);

    public void eliminarCancion(Long idLista, Long idCancion);

    public Lista crearLista(Long idUsuario, String nombreLista);
}

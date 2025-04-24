package com.bad.melody.services;

public interface ListaReproducionService {

    public void agregarCancion(Long idLista, Long idCancion);

    public void eliminarCancion(Long idLista, Long idCancion);
}

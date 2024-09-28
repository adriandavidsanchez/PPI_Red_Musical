package com.bad.melody.services;

import java.util.List;

import com.bad.melody.model.Genero;
public interface GeneroService {

    List<Genero> obtenerTodosGeneros ();

    Genero obtenerGeneroPorId (Long id);

    Genero ingresarNuevoGenero (Genero nuevoGenero);

    Genero actualizarGenero (Long id, Genero actualizarGenero);

    Long contarTodosGeneros ();

    void eliminarGenero (Long id);
}

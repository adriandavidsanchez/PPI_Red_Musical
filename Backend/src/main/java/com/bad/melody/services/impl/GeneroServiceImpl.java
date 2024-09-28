package com.bad.melody.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bad.melody.model.Genero;
import com.bad.melody.repository.GeneroRepository;
import com.bad.melody.services.GeneroService;

@Service
public class GeneroServiceImpl implements GeneroService {

    @Autowired
    GeneroRepository generoRepository;

    @Override
    public List<Genero> obtenerTodosGeneros() {
        return generoRepository.findAll();
    }

    @Override
    public Genero obtenerGeneroPorId(Long id) {
        return generoRepository.findById(id).orElse(null);
    }

    @Override
    public Genero ingresarNuevoGenero(Genero nuevoGenero) {
        return generoRepository.save(nuevoGenero);
    }

    @Override
    public Genero actualizarGenero(Long id, Genero actualizarGenero) {
        Genero generoBBDD =  generoRepository.findById(id).orElse(null);
        if(generoBBDD != null){
            generoBBDD.setNombreGenero(actualizarGenero.getNombreGenero());
            return generoRepository.save(generoBBDD);
        }
        return null;
    }

    @Override
    public Long contarTodosGeneros() {
        return generoRepository.count();
    }

    @Override
    public void eliminarGenero(Long id) {
        generoRepository.deleteById(id);
    }
}

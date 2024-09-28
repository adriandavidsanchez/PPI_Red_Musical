package com.bad.melody.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bad.melody.model.HistorialReproducion;
import com.bad.melody.repository.HistorialReproducionRepository;
import com.bad.melody.services.HistorialReproducionService;

@Service
public class HistorialReproducionSerciceImpl implements HistorialReproducionService{

    @Autowired
    HistorialReproducionRepository historialReproducionRepository;

    @Override
    public List<HistorialReproducion> obtenerTodosHistorialesReproduciones() {
        return historialReproducionRepository.findAll();
    }

    @Override
    public Long contarHiistorialessReproducion() {
        return historialReproducionRepository.count();
    }

    @Override
    public void eliminarHirialPorId(Long id) {
        historialReproducionRepository.deleteById(id);
    }

    @Override
    public HistorialReproducion nuevoHistorialReproducion(Long id, HistorialReproducion nuevoHistorialReproducion) {
        return historialReproducionRepository.save(nuevoHistorialReproducion);
    }
}

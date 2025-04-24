package com.bad.melody.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bad.melody.model.ListaReproducion;

@Repository
public interface ListaReproducionRepository extends JpaRepository<ListaReproducion, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario

}

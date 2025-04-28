package com.bad.melody.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bad.melody.model.Lista;

@Repository
public interface ListaRepository extends JpaRepository<Lista, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario

}

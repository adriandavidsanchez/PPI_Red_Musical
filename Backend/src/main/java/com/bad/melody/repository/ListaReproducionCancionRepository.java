package com.bad.melody.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bad.melody.model.ListaReproduccionCancion;

@Repository
public interface ListaReproducionCancionRepository extends JpaRepository<ListaReproduccionCancion, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
    Optional<ListaReproduccionCancion> findByListaReproduccion_IdListaAndCancionListaReproduccion_Id(Long idLista, Long idCancion);

}

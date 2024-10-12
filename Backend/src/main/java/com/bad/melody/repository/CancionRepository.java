package com.bad.melody.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bad.melody.model.Cancion;
import com.bad.melody.model.Genero;

@Repository
public interface CancionRepository extends JpaRepository<Cancion, Long> {
    List<Cancion> findTop2ByOrderByIdDesc();

    List<Cancion> findByGeneroCancion(Genero genero);

    @Query("SELECT c FROM Cancion c WHERE c.generoCancion = :genero ORDER BY " +
            "(SELECT AVG(co.calificacion) FROM ComentarioCancion co WHERE co.cancion = c) DESC")
    List<Cancion> findByGeneroCancionOrderByCalificacionPromedioDesc(Genero genero);
    
}
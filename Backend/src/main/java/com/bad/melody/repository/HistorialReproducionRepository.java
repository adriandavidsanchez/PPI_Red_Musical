package com.bad.melody.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bad.melody.model.HistorialReproducion;

@Repository
public interface HistorialReproducionRepository extends JpaRepository <HistorialReproducion,Long> {

}

package com.bad.melody.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bad.melody.model.ComentarioCancion;


@Repository
public interface ComentarioCancionRepository   extends JpaRepository <ComentarioCancion, Long>{
    List<ComentarioCancion> findByCancionId(Long cancionId);
}
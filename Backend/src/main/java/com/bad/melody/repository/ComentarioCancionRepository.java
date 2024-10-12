package com.bad.melody.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bad.melody.model.ComentarioCancion;

@Repository
public interface ComentarioCancionRepository   extends JpaRepository <ComentarioCancion, Long>{

}
package com.bad.melody.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bad.melody.model.Cancion;

@Repository
public interface CancionRepository extends JpaRepository <Cancion,Long> {

}
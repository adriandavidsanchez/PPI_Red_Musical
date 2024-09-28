package com.bad.melody.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bad.melody.model.Genero;

@Repository
public interface GeneroRepository  extends JpaRepository <Genero,Long>{

}

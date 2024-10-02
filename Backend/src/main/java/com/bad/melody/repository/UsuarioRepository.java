package com.bad.melody.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bad.melody.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository <Usuario, Long> {

    Usuario findByEmail(String email);
    
    @Query(value = "SELECT id FROM Usuario ORDER BY fechaCreacion DESC LIMIT 1", nativeQuery = true)
    Long findLastInsertedId();

    Optional<Usuario> findByContacto(Long contacto);
}

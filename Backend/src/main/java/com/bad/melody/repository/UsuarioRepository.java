package com.bad.melody.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bad.melody.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Método para buscar un usuario por email
    Usuario findByEmail(String email);
    
    // Consulta para obtener el último ID insertado
    @Query(value = "SELECT id FROM Usuario ORDER BY fechaCreacion DESC LIMIT 1", nativeQuery = true)
    Long findLastInsertedId();

    // Método para buscar un usuario por contacto
    Usuario findByContacto(Long contacto);

    // Método para eliminar las canciones del usuario antes de eliminar el usuario
    @Modifying
    @Transactional
    @Query("DELETE FROM Cancion c WHERE c.artistaCancion.contacto = :usuarioId")
    void deleteCancionesByUsuarioId(@Param("usuarioId") Long usuarioId);
}

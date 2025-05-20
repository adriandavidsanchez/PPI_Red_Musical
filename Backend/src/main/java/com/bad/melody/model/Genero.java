// Genero.java
package com.bad.melody.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Género musical. Ignoramos la lista de canciones para evitar ciclos
 * o campos innecesarios al serializar.
 */
@Entity
@Table(name = "tblGeneros")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({ "canciones" })
public class Genero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombreGenero;
}

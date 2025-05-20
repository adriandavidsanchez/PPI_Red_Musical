// Usuario.java
package com.bad.melody.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Usuario de la aplicación. Ignoramos la relación
 * listaUsuario al serializar esta clase anidada.
 */
@Entity
@Table(name = "tblUsuarios")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({ "listaUsuario" })
public class Usuario {

    @NotBlank
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Id
    @Column(name = "contacto", nullable = false, unique = true)
    private Long contacto;

    @Email
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank
    @Size(min = 10, max = 15)
    @Column(name = "contrasenia", nullable = false)
    private String contrasenia;

    @Column(name = "rol")
    private String rol;

    @Column(name = "imagenUsuario")
    private String imagenUsuario;

    @Column(name = "fechaSubidaCancion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacionUsuario = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "genero")
    private Genero genero;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_ListaUsuario")
    @JsonManagedReference
    private Lista listaUsuario;
}

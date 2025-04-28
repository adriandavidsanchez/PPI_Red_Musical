package com.bad.melody.model;

import java.time.LocalDateTime;

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

@Entity
@Table(name = "tblUsuarios")
@Data
@AllArgsConstructor
@NoArgsConstructor
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

    @Column(name =  "imagenUsuario")
    private String imagenUsuario;

    @Column(name = "fechaSubidaCancion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacionUsuario = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "id_Usuario_Genero")
    private Genero genero;

    @OneToOne
    @JoinColumn(name = "id_ListaUsuario")
    private Lista listaUsuario;

}

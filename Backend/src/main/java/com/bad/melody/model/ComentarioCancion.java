package com.bad.melody.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tblComentarioCancion")
public class ComentarioCancion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000, name = "comentarioCancion")
    private String comentarios;

    @Column(name = "calificacion", nullable = false)
    private int calificacion;

    @Column(name = "fechaComentario", nullable = false, updatable = false)
    private LocalDateTime fechaComentario = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "id_UsuarioComentario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_CancionComentario")
    private Cancion cancion;

}

package com.bad.melody.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tblCanciones")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cancion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Cancion")
    private Long id;

    @Column(name = "titulo", nullable = false)
    private String tituloCancion;

    @Column(name = "AudioCancion")
    private String audioCancion;

    @Column(name = "Descripcion")
    private String Description;

    @Column(name = "videoCancion")
    private String videoCancion;

    @Column(name = "imagenCancion", nullable = false)
    private String imagenCancion;

    @Column(name = "fechaSubidaCancion", nullable = false, updatable = false)
    private LocalDate fechaSubidaCancion = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "contacto_usuario", nullable = false)
    private Usuario artistaCancion;

    @ManyToOne
    @JoinColumn(name = "id_genero_cancion", nullable = false)
    private Genero generoCancion;
}

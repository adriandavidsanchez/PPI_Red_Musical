package com.bad.melody.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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

    @Lob
    @Column(nullable = false)
    private byte[] subirCancion;

    @Lob
    @Column(name = "videoCancion")
    private byte[] subirVideo;

    @Lob
    @Column(name = "imagenCancion", nullable = false)
    private byte[] imagenCancion;

    @Column(name = "fechaSubidaCancion", nullable = false, updatable = false)
    private LocalDate fechaSubidaCancion = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "id_ArtistaCancion", nullable = false)
    private Usuario ArtistaCancion;

    @ManyToOne
    @JoinColumn(name = "id_GeneroCancion")
    private Cancion cancion;
}

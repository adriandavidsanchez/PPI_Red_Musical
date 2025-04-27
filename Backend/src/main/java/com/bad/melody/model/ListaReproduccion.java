package com.bad.melody.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "tblListaReproduccion")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ListaReproduccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idListaReproduccion;

    @Column(name = "nombreListaReproduccion", nullable = false)
    private String nombreListaReproduccion;

    @Column(name = "fechaCreacionListaReproduccion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacionListaReproducion = LocalDateTime.now();

    @OneToOne
    @JoinColumn(name = "id_UsuarioListaReproduccion")
    private Usuario usuarioListaReproducion;

    @OneToMany(mappedBy = "listaReproduccionLista", cascade = { CascadeType.PERSIST, CascadeType.MERGE }) 
    private List<ListaReproduccionCancion> canciones = new ArrayList<>();

}

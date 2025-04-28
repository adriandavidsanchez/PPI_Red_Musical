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
@Table(name = "tblLista")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Lista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLista;

    @Column(name = "nombreLista", nullable = false)
    private String nombreLista;

    @Column(name = "fechaCreacionLista", nullable = false, updatable = false)
    private LocalDateTime fechaCreacionLista = LocalDateTime.now();

    @OneToOne
    @JoinColumn(name = "id_UsuarioListaReproduccion")
    private Usuario usuarioListaReproducion;

    @OneToMany(mappedBy = "lista", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    private List<ListaReproduccionCancion> canciones = new ArrayList<>();

}

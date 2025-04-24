package com.bad.melody.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ListaReproduccionCancion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idListaReproduccionCancion;

    @ManyToOne
    @JoinColumn(name = "id_ListaReproduccionCancion")
    private Cancion cancionListaReproduccion;

    @ManyToOne
    @JoinColumn(name = "id_ListaReproduccionLista")
    private ListaReproducion listaReproduccionLista;
}

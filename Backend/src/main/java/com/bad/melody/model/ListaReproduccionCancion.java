package com.bad.melody.model;

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
@Table(name = "tblListaReproduccionCancion")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ListaReproduccionCancion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idListaReproduccionCancion;

    @ManyToOne
    @JoinColumn(name = "id_CancionListaReproduccion")
    private Cancion cancionListaReproduccion;

    @ManyToOne
    @JoinColumn(name = "id_listaReproduccionLista")
    private ListaReproduccion listaReproduccionLista;

    
}

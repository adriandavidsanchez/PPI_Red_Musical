package com.bad.melody.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

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

/**
 * Entidad intermedia para relacionar Lista y Cancion,
 * con anotaciones Jackson para evitar recursividad.
 */
@Entity
@Table(name = "tblListaReproduccionCancion")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ListaReproduccionCancion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("idListaReproduccionCancion")
    private Long idListaReproduccionCancion;

    /**
     * Canción asociada, incluye solo campos básicos y evita volver a serializar lista o artista completo.
     */
    @ManyToOne
    @JoinColumn(name = "id_CancionListaReproduccion")
    @JsonIgnoreProperties({"artistaCancion", "generoCancion"})
    @JsonProperty("cancion")
    private Cancion cancionListaReproduccion;

    /**
     * Lista padre, evitamos recursión omitiendo sus sublistas y canciones.
     */
    @ManyToOne
    @JoinColumn(name = "lista")
    @JsonIgnoreProperties({"usuarioListaReproducion", "canciones"})
    @JsonProperty("lista")
    private Lista listaReproduccion;
}

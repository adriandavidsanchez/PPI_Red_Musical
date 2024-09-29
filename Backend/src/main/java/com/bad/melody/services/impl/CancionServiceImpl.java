package com.bad.melody.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bad.melody.model.Cancion;
import com.bad.melody.repository.CancionRepository;
import com.bad.melody.services.CancionService;

@Service
public class CancionServiceImpl implements CancionService {

    /*Se esta inyectando la interface AlbumRepository para tener una
    comunicacion la base de datos y utilizar los metos de jpa*/
    @Autowired
    private CancionRepository cancionRepository;

    /*Los metodos se encuentran con override porque se estan sobre escribiendo,
     *ya que estos se estan implementando*/


    /*Con este metodo estamos llamando al repositorio para utilizar el metodo de jpa,
     *para obtener todos los canciones que se encuentren en la base de datos
     */
    @Override
    public List<Cancion> obtenerLasCanciones() {
        return cancionRepository.findAll();
    }

    /*En este metodo estamos llamando al repositorio para utilizar el metodo jpa,
     *para buscar un cancion en especifico por medio de su id en la base de datos
     */
    @Override
    public Cancion obtenerCancionPorId(Long id) {
        return cancionRepository.findById(id).orElse(null);
    }

    /*En este metodo estamos llamando al repositorio para utilizar el metodo jpa,
     *para guardar un nuevo cancion en la base de datos
     */
    @Override
    public Cancion ingresarCancionNueva(Cancion CancionNueva) {
        return cancionRepository.save(CancionNueva);
    }

    /*En este metodo estamos llamando al repositorio para utilizar el metodo jpa,
     *para actualizar el cancion en la base de datos
     */
    @Override
    public Cancion actualizarCancion(Long id, Cancion CancionActualizar) {
        Cancion cancionBBDD = cancionRepository.findById(id).orElse(CancionActualizar);
        if(cancionBBDD != null){
            cancionBBDD.setTituloCancion(CancionActualizar.getTituloCancion());
            cancionBBDD.setCancion(CancionActualizar.getCancion());
            return cancionRepository.save(cancionBBDD);
        }
        return null;
    }

    /*En este metodo estamos llamando al repositorio para utilizar el metodo jpa,
     *para llevar una cuenta de cuantos canciones se encuentran guardados en la base de datos
     */
    
    @Override
    public Long contarCanciones() {
        return cancionRepository.count();
    }

    /*En este metodo estamos llamando al repositorio para utilizar el metodo jpa,
     *Para eliminar el cancion en la base de datos por medio del id
     */
    @Override
    public boolean eliminarCancion(Long id) {
        try {
            cancionRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    


}

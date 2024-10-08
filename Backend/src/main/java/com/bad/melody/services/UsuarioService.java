package com.bad.melody.services;

import com.bad.melody.model.Usuario;

public interface UsuarioService {

    // Cambia 'ObtenerUsarioPorId' a 'obtenerUsuarioPorId'
    Usuario obtenerUsuarioPorId(Long id);

    // Cambia 'inicisiarSecionUsuario' a 'iniciarSesionUsuario'
    Usuario iniciarSesionUsuario(String email, String contrasenia);

    Usuario crearUsuario(Usuario usuario);

    boolean eliminarUsuario(Long id); // Este método no necesita cambios

    Usuario actualizarUsuario(Long id, Usuario actualizarUsuario);

    Long getLastInsertedId();
}


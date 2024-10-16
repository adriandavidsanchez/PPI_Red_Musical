package com.bad.melody.services;

import java.util.List;

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
    
    Usuario obtenerUsuarioPorContacto(Long contacto);
    
    List<Usuario> obtenerUltimosDosUsuarios();
    Usuario obtenerUsuarioPorEmail(String email);
}


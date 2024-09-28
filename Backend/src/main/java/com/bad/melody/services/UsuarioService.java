package com.bad.melody.services;


import com.bad.melody.model.Usuario;

public interface UsuarioService {

    Usuario ObtenerUsarioPorId (Long id);

    Usuario inicisiarSecionUsuario (String email, String contrasenia);

    Usuario crearUsuario (Usuario usuario);

    boolean eliminarUsuario(Long id);

    Usuario actualizarUsuario (Long id, Usuario actualizarUsuario);
}

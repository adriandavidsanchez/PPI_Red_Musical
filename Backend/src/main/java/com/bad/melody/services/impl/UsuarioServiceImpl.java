package com.bad.melody.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bad.melody.model.Usuario;
import com.bad.melody.repository.UsuarioRepository;
import com.bad.melody.services.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Usuario ObtenerUsarioPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @Override
    public Usuario inicisiarSecionUsuario(String email, String contrasenia) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null || !passwordEncoder.matches(usuario.getEmail(), contrasenia)) {
            throw new RuntimeException("Correo electrónico o contraseña incorrectos");
        }
        return usuario;
    }

    @Override
    public Usuario crearUsuario(Usuario usuario) {
        //verificar si el correo ya esta registrado
        if(usuarioRepository.findByEmail(usuario.getEmail()) != null){
            throw new RuntimeException("El correo electrónico ya está registrado");
        }
        //codificar la catrasenia antes de guardar el usuario
        usuario.setContrasenia(passwordEncoder.encode(usuario.getContrasenia()));
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario actualizarUsuario(Long id, Usuario actualizarUsuario) {
        Usuario usuarioBBDD = usuarioRepository.findById(id).orElse(null);
        if (usuarioBBDD != null) {
            usuarioBBDD.setNombre(actualizarUsuario.getNombre());
            return usuarioRepository.save(usuarioBBDD);
        }
        return null;
    }

    @Override
    public boolean eliminarUsuario(Long id) {
        try {
            usuarioRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}

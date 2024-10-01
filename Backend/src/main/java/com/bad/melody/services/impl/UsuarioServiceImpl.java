package com.bad.melody.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bad.melody.model.Usuario;
import com.bad.melody.repository.UsuarioRepository;
import com.bad.melody.services.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }
    
    @Override
    public Long getLastInsertedId() {
        // Método que devuelve el ID del último usuario insertado
        return usuarioRepository.findLastInsertedId();
    }
    
    @Override
    public Usuario iniciarSesionUsuario(String email, String contrasenia) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        // Compara la contraseña directamente
        if (usuario == null || !usuario.getContrasenia().equals(contrasenia)) {
            throw new RuntimeException("Correo electrónico o contraseña incorrectos");
        }
        return usuario;
    }

    public Usuario crearUsuario(Usuario usuario) {
        if (usuario.getContacto() == null) {
            throw new RuntimeException("El campo 'contacto' no puede ser null");
        }
    
        // Verificar si el contacto ya está registrado
        if (usuarioRepository.findById(usuario.getContacto()).isPresent()) {
            throw new RuntimeException("El contacto ya está registrado");
        }
    
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
        if (!usuarioRepository.existsById(id)) {
            return false; // Retorna false si el usuario no existe
        }
        try {
            usuarioRepository.deleteById(id);
            return true; // Retorna true si se eliminó correctamente
        } catch (Exception e) {
            return false; // Retorna false si ocurrió un error
        }
    }
    

}


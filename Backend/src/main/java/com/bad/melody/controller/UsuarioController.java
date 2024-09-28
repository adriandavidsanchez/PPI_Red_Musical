package com.bad.melody.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bad.melody.model.Usuario;
import com.bad.melody.services.impl.UsuarioServiceImpl;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioServiceImpl usuarioServiceImpl;

    @DeleteMapping("/{id}")
    public String eliminarPorId (@PathVariable("id") Long id){
        boolean verificar = this.usuarioServiceImpl.eliminarUsuario(id);
        if (verificar) {
            return "Usuario elinado satisfactoriamente";
        }else{
            return "No se pudo eliminar el usuario";
        }
    }

    @GetMapping("/formulario-registrarse")
    public String mostrarFormularioCreacion (Model model){
        model.addAttribute("usuario", new Usuario());
        return "formulario-usuario";
    }

    @PostMapping
        public String crearUsuario (@ModelAttribute Usuario usuario, Model model){
            try{
                usuarioServiceImpl.crearUsuario(usuario);
                return "redirect:/usuarios";
            }catch (Exception e) {
                model.addAttribute("error", "Hubo un error al crear el usuario");
                return "formulario-usuario";
            }
        }

    @PutMapping("/{id}")
    public Usuario actualizarUsuario (@PathVariable Long id, @RequestBody Usuario usuarioActualizado){
        
        if (usuarioActualizado == null) {
        throw new RuntimeException("Usuario no encontrado con id: " + id);
    }
        return usuarioServiceImpl.actualizarUsuario(  id, usuarioActualizado);
    }

    @PostMapping("/iniciarSesion")
    public ResponseEntity<String> iniciarSesion (@RequestParam String email, @RequestParam String contrasenia){
        Usuario usuario = usuarioServiceImpl.inicisiarSecionUsuario(email, contrasenia);
        if (usuario != null) {
            return ResponseEntity.ok("Inicio de sesión exitoso");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos");
        }
    }

}

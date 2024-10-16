package com.bad.melody.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bad.melody.model.Usuario;
import com.bad.melody.services.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired

    private final UsuarioService usuarioServiceImpl;

    public UsuarioController(UsuarioService usuarioServiceImpl) {
        this.usuarioServiceImpl = usuarioServiceImpl;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPorId(@PathVariable("id") Long id) {
        boolean verificar = this.usuarioServiceImpl.eliminarUsuario(id);
        if (verificar) {
            return ResponseEntity.ok("Usuario eliminado satisfactoriamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se pudo eliminar el usuario, el ID no existe");
        }
    }

    @PostMapping("/registrarse")
    public ResponseEntity<String> crearUsuario(@RequestBody Usuario usuario) {
        try {
            if (usuario.getContacto() == null) {
                throw new RuntimeException("El campo 'contacto' no puede ser null");
            }
            usuarioServiceImpl.crearUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario creado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Hubo un error al crear el usuario: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        if (usuarioActualizado == null) {
            return ResponseEntity.badRequest().body(null); // Retorna un 400 si el usuario no está presente
        }

        Usuario usuarioModificado = usuarioServiceImpl.actualizarUsuario(id, usuarioActualizado);
        if (usuarioModificado != null) {
            return ResponseEntity.ok(usuarioModificado); // Devuelve el usuario modificado
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Retorna 404 si no se encontró el usuario
        }
    }

    @PostMapping("/iniciarSesion")
    public ResponseEntity<String> iniciarSesion(@RequestParam String email, @RequestParam String contrasenia) {
        try {
            Usuario usuario = usuarioServiceImpl.iniciarSesionUsuario(email, contrasenia);
            return ResponseEntity.ok("Inicio de sesión exitoso para: " + usuario.getNombre());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/ultimo-id")
    public ResponseEntity<Long> getLastInsertedId() {
        Long lastId = usuarioServiceImpl.getLastInsertedId();
        return ResponseEntity.ok(lastId);
    }

    // Obtener los IDs de los dos últimos usuarios
    @GetMapping("/ultimos-dos")
    public ResponseEntity<List<Long>> obtenerIdsUltimosDosUsuarios() {
        List<Usuario> ultimosDosUsuarios = usuarioServiceImpl.obtenerUltimosDosUsuarios();

        // Verifica que la lista no esté vacía
        if (ultimosDosUsuarios.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        // Mapea los IDs de los usuarios obtenidos
        List<Long> ids = ultimosDosUsuarios.stream()
                .map(Usuario::getContacto) // Cambiado a getContacto()
                .collect(Collectors.toList());
        return new ResponseEntity<>(ids, HttpStatus.OK);
    }

    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping("/{contacto}")
    public ResponseEntity<Usuario> obtenerUsuarioPorContacto(@PathVariable Long contacto) {
        try {
            Usuario usuario = usuarioService.obtenerUsuarioPorContacto(contacto);
            if (usuario != null) {
                return new ResponseEntity<>(usuario, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/contacto-por-email")
    public ResponseEntity<Long> obtenerContactoPorEmail(@RequestParam String email) {
        try {
            // Llama al servicio para obtener el usuario por email
            Usuario usuario = usuarioServiceImpl.obtenerUsuarioPorEmail(email);
            if (usuario != null) {
                return ResponseEntity.ok(usuario.getContacto());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null); // Retorna 404 si no se encontró el usuario
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // Manejo de errores
        }
    }

}

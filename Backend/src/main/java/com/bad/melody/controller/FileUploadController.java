package com.bad.melody.controller;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
public class FileUploadController {
    private static final String UPLOAD_DIR = "/uploads";  // Carpeta donde se guardarán los archivos

    @PostMapping
    public String uploadFile(@RequestParam("audio") MultipartFile file) {
        try {
            // Asegurarse de que la carpeta existe
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Guardar el archivo en la carpeta especificada
            String fileName = file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            return "Archivo guardado en: " + filePath.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return "Error al subir el archivo.";
        }
    }
}

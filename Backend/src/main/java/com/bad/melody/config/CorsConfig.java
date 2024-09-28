package com.bad.melody.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer{

    @SuppressWarnings("null")
    @Override
    public void addCorsMappings (CorsRegistry registry) {
        registry.addMapping("/**")
        .allowedOrigins("http://localhost:5173")//escribir la url del proyecyo front
        .allowedMethods("*")//especificar los metodos a permitir desde el fron, get, post ...
        .allowCredentials(true);
    }

}

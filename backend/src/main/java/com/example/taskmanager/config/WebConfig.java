package com.yourproject.config;  // Place it in a `config` or appropriate package

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  // Indicates this is a configuration class
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Apply CORS to all API endpoints
        registry.addMapping("/**")  // Apply to all routes
                .allowedOrigins("http://localhost:3000")  // Allow requests from React frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow common methods
                .allowedHeaders("*")  // Allow all headers
                .allowCredentials(true);  // Allow cookies (optional, if needed)
    }
}

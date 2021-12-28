package com.bit.wheregoing.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


//Front-end Client에서 server의 API에 access 할 수 있도록 cors를 open 
@Configuration
public class WebMvcConfig implements WebMvcConfigurer{
	private final long MAX_AGE_SECS = 3600;
	 @Value("${app.cors.allowedOrigins}")
	    private String[] allowedOrigins;
	
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
        .allowedOrigins(allowedOrigins)// 
        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true)
        .maxAge(MAX_AGE_SECS);
    }
}


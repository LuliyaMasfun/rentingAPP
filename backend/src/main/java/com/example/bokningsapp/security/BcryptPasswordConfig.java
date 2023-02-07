package com.example.bokningsapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class BcryptPasswordConfig {

    @Bean
    @Primary
    public BCryptPasswordEncoder bCryptPasswordEncoder1() {
        return new BCryptPasswordEncoder(14);
    }

    }


package com.example.bokningsapp.token;

import org.springframework.beans.factory.annotation.Autowired;

public class JwtResponse {

    private final String jwtToken;

    @Autowired
    public JwtResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getToken() {
        return this.jwtToken;
    }
}

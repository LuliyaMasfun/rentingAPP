package com.example.bokningsapp.security.jwt;

import com.example.bokningsapp.model.Role;
import com.example.bokningsapp.model.User;

import java.util.List;
import java.util.Set;

public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private User user;

    private Set<Role> roles;
    public JwtResponse(String token, User user, Set<Role> roles) {
        this.token = token;
        this.user= user;
        this.roles= roles;
    }
    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public User getUser() {
        return user;
    }

    public void setUserDto(User user) {
        this.user = user;
    }
}

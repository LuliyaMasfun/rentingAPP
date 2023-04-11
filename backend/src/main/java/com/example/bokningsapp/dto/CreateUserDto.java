package com.example.bokningsapp.dto;

import com.example.bokningsapp.model.Role;

import java.util.Set;

public class CreateUserDto {

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private Set<Role> roles;

    public CreateUserDto() {
    }

    public CreateUserDto(String firstName, String lastName, String email, String password, Set<Role> roles) {
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}

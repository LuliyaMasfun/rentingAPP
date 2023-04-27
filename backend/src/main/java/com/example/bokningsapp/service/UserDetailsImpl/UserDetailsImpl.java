package com.example.bokningsapp.service.UserDetailsImpl;


import com.example.bokningsapp.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String username;

    private String email;

    private String organisationRequest;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;
    //private Collection<? extends GrantedAuthority> privilegeAuthorities;

    public UserDetailsImpl(Long id, String username, String email,String organisationRequest, String password,
                           Collection<? extends GrantedAuthority> authorities ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.organisationRequest = organisationRequest;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(User user) {
        Collection<GrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName().toString()));
            role.getPrivileges().forEach(privilege -> {
                authorities.add(new SimpleGrantedAuthority(privilege.getName()));
            });
        });

        return new UserDetailsImpl(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                authorities

        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }




    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getOrganisationRequest() {
        return organisationRequest;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public String toString() {
        return "UserDetailsImpl{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", organisationRequest='" + organisationRequest + '\'' +
                ", password='" + password + '\'' +
                ", authorities=" + authorities +
                '}';
    }
}



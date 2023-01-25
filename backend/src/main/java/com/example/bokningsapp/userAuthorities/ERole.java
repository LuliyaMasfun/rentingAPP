package com.example.bokningsapp.userAuthorities;

import jakarta.persistence.*;

@Table
@Entity(name = "roles")
public class ERole {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Enumerated(EnumType.STRING)
        @Column
        private com.example.bokningsapp.enums.ERole role;

    public ERole() {
    }

    public ERole(com.example.bokningsapp.enums.ERole role){
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public com.example.bokningsapp.enums.ERole getRole() {
        return role;
    }

    public void setRole(com.example.bokningsapp.enums.ERole role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", role=" + role +
                '}';
    }
}

package com.example.bokningsapp.model;

import com.example.bokningsapp.userAuthorities.ERole;
import jakarta.persistence.*;

@Table
@Entity(name = "admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;
    @Column
    private ERole role_Admin;


}

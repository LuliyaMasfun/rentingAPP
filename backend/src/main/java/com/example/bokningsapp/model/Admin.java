package com.example.bokningsapp.model;

import jakarta.persistence.*;

@Table
@Entity(name = "admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}

package com.example.bokningsapp.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table
public class ActivationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String token;

    @Column(nullable = false)
    private LocalDateTime expiryDateTime;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    public ActivationToken() {
    }

    public ActivationToken(String token, LocalDateTime expiryDateTime, User user) {
        this.token = token;
        this.expiryDateTime = expiryDateTime;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getExpiryDateTime() {
        return expiryDateTime;
    }

    public void setExpiryDateTime(LocalDateTime expiryDateTime) {
        this.expiryDateTime = expiryDateTime;
    }

    public ActivationToken(Long id, String token, LocalDateTime expiryDateTime, User user) {
        this.id = id;
        this.token = token;
        this.expiryDateTime = expiryDateTime;
        this.user = user;
    }
}
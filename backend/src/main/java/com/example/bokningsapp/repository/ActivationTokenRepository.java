package com.example.bokningsapp.repository;

import com.example.bokningsapp.model.ActivationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivationTokenRepository extends JpaRepository<ActivationToken,Long> {
}

package com.example.bokningsapp.repository;

import com.example.bokningsapp.enums.ERole;
import com.example.bokningsapp.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

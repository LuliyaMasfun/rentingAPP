package com.example.bokningsapp.repository;

import com.example.bokningsapp.userAuthorities.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<ERole,Long> {
}

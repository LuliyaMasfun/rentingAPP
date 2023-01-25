package com.example.bokningsapp.repository;

import com.example.bokningsapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

      Boolean existsByEmail(String email);


}

package com.example.bokningsapp.repository.UsersRepo;

import com.example.bokningsapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    User findUserByEmail(String email);
    boolean existsByEmail(String email);


    User findUserById(Long id);


}

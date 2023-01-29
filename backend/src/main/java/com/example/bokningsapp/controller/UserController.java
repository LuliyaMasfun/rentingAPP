package com.example.bokningsapp.controller;

import com.example.bokningsapp.enums.ERole;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.UserPrincipal;
import com.example.bokningsapp.service.UserService;
import com.example.bokningsapp.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {


    private final UserRepository userRepository;
    private final UserServiceImpl userServiceImpl;

    @Autowired
    public UserController(UserRepository userRepository, UserServiceImpl userServiceImpl) {
        this.userRepository = userRepository;
        this.userServiceImpl = userServiceImpl;
    }

    @PostMapping(value = "/createUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = userServiceImpl.createUser(user);
        return new ResponseEntity<>(newUser,HttpStatus.CREATED);
    }

    //User
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userServiceImpl.updateUser(id, updatedUser);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //Admin
    @PutMapping("/updateUserAdmin/{id}")
    public ResponseEntity<?> updateUserAdmin(@PathVariable Long id, @RequestBody User user) {
        // Get the current authenticated user
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal currentUser = (UserPrincipal) auth.getPrincipal();

        // Check if the current user is an admin
        if (!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(ERole.ROLE_ADMIN.toString()))) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User updatedUser = userService.updateUserAdmin(id, user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping(value = "deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting user: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }




}

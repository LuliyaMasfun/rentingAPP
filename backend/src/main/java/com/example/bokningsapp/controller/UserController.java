package com.example.bokningsapp.controller;

import com.example.bokningsapp.exception.EquipmentNotFoundException;
import com.example.bokningsapp.exception.UserNotFoundException;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;

import com.example.bokningsapp.service.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class UserController {


    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/allUsers")
    // @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
        public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public void deleteUser(@PathVariable Long id) {
             userService.deleteUser(id);
    }

    @PutMapping(value = "/updateUser/{id}")
    public ResponseEntity<User> updateUser2(@PathVariable long id, @RequestBody User user) {
        User updatedUser = userRepository.getReferenceById(id);

        try {
            updatedUser.setFirstName(user.getFirstName());
            updatedUser.setLastName(user.getLastName());
            updatedUser.setEmail(user.getEmail());

            userRepository.save(updatedUser);

            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @PatchMapping(value = "/updateUser/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {

        return userService.updateUser(id, updatedUser);
    }
}



    //DENNA METOD KROCKAR MED AUTH
 /*   @PostMapping(value = "/createUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = userService.createUser(user);
        return new ResponseEntity<>(newUser,HttpStatus.CREATED);
    }
     */

/*
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/name/{username}")
    public Optional<User> findUserByUsername(@PathVariable String username) {
        return userRepository.findUserByEmail(username);
    }
*/




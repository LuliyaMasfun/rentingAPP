package com.example.bokningsapp.controller.users;

import com.example.bokningsapp.dto.CreateUserDto;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;

import com.example.bokningsapp.service.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
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

    @PostMapping("/create-user")
    public ResponseEntity<String> createUser(@RequestBody CreateUserDto user) {

       return userService.saveUser(user);
    };

    @DeleteMapping("/deleteUser/{id}")
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

    @GetMapping("/userInfo")
    public Map<Long, Map<String, String>> getUserInfoForIds(@RequestParam List<Long> ids) {
        // fetch all users with the given IDs
        List<User> users = userRepository.findAllById(ids);
        // create a map of IDs to user info
        Map<Long, Map<String, String>> userInfoById = new HashMap<>();
        for (User user : users) {
            Map<String, String> userMap = new HashMap<>();
            userMap.put("firstName", user.getFirstName());
            userMap.put("lastName", user.getLastName());
            userMap.put("phoneNumber", user.getPhoneNumber());
            userMap.put("email", user.getEmail());
            userInfoById.put(user.getId(), userMap);
        }
        return userInfoById;
    }

    @PatchMapping(value = "/updateUsersPassword/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }
}





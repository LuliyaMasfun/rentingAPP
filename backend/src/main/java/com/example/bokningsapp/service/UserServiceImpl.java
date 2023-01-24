package com.example.bokningsapp.service;

import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ResponseEntity<User> getUser(long id) {
        User user = userRepository.getReferenceById(id);

            return new ResponseEntity<>(user, HttpStatus.OK);

    }

    @Override
    public ResponseEntity<List<User>> getAllUsers(String userName) {
        try {
            List<User> userList = userRepository.findAll();

            if (!userList.isEmpty()) {
                return new ResponseEntity<>(userList, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }



        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            // Kan jag få ut Error meddelandet på något sätt?

        }
    }

    @Override
    public User createUser(User user) {
        // check for existing user with same email
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            throw new IllegalArgumentException("User with email " + user.getEmail() + " already exists");
        }
        // encrypt the password
        user.setPassword(encryptPassword(user.getPassword()));

        return userRepository.save(user);
    }
    @Override
    public String encryptPassword(String password) {
        return passwordEncoder.encode(password);
    }

    @Override
    public ResponseEntity<User> saveUser(User user) {
        return null;
    }

    @Override
    public ResponseEntity<User> updateUser(User user) {
        return null;
    }

    @Override
    public ResponseEntity<User> deleteUser(long id) {
        return null;
    }
}

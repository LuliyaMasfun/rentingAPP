package com.example.bokningsapp.service;

import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUser(long id) {

        return userRepository.getReferenceById(id);
    }

    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();

    }

    @Override
    public User saveUser(User user) {

        User _user = new User(user.getName(), user.getLastName(), user.getEmail(), user.getEquipmentBookings());

        userRepository.save(_user);

        return _user;
    }

    @Override
    public User updateUser(User user) {
        return null;
    }

    @Override
    public User deleteUser(long id) {
        return null;
    }
}

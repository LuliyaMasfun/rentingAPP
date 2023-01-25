package com.example.bokningsapp.service;

import com.example.bokningsapp.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {


    User getUser(long id);

    List<User> getAllUsers(); //dubbelchecka denna med Kristoffer
    User saveUser (User user);
    User updateUser(User user);
    User deleteUser (long id);

}

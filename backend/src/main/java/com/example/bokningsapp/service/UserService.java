package com.example.bokningsapp.service;

import com.example.bokningsapp.dto.RegistrationRequest;
import com.example.bokningsapp.model.User;
import org.springframework.stereotype.Service;


@Service
public interface UserService {
    public User createUser(User user);
    public String encryptPassword(String password);
    public User updateUser(Long id, User updatedUser);
    public User updateUserAdmin(Long id, User user);
    public void deleteUser(Long id);

}

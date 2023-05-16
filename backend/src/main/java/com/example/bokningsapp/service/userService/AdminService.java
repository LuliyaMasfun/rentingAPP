/*
package com.example.bokningsapp.service.userService;

import com.example.bokningsapp.exception.ResourceNotFoundException;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.config.BcryptPasswordConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private final UserRepository userRepository;
    private final BcryptPasswordConfig bcryptPasswordConfig;

    @Autowired
    public AdminService(UserRepository userRepository, BcryptPasswordConfig bcryptPasswordConfig) {
        this.userRepository = userRepository;
        this.bcryptPasswordConfig = bcryptPasswordConfig;
    }

    public User updateUserAdmin(Long id, User user) {
        // Get the user to be updated
        User currentUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", id));

        // Update the user's Account status
        currentUser.setAccountStatus(user.getAccountStatus());
        currentUser.setEmail(user.getEmail());
        if (user.getPassword() != null) {
            user.setPassword(user.getPassword().CryptPasswordEncoder1);
        }
        return userRepository.save(currentUser);
    }
}
*/

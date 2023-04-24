package com.example.bokningsapp.service.userService;

import com.example.bokningsapp.exception.ResourceNotFoundException;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UsersRepo.UserRepository;
import com.example.bokningsapp.security.config.BcryptPasswordConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BcryptPasswordConfig bcryptPasswordConfig;

    @Autowired
    public UserService(UserRepository userRepository, BcryptPasswordConfig bcryptPasswordConfig) {
        this.userRepository = userRepository;
        this.bcryptPasswordConfig = bcryptPasswordConfig;
    }



    public String encryptPassword(String password) {
        return bcryptPasswordConfig.bCryptPasswordEncoder1().encode(password);   }

   /* public Long getCurrentUserId () {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ((UserPrincipal) auth.getPrincipal()).getId();
    } Cannot invoke "org.springframework.security.core.Authentication.getPrincipal()" because "auth" is null

    */

    public User updateUserAdmin(Long id, User user) {
        // Get the user to be updated
        User currentUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", id));

        // Update the user's Account status
        currentUser.setAccountStatus(user.getAccountStatus());
        currentUser.setEmail(user.getEmail());
        if (user.getPassword() != null) {
            user.setPassword(encryptPassword(user.getPassword()));
        }
        return userRepository.save(currentUser);
    }
    public ResponseEntity<String> deleteUser(Long id) {
        User user = userRepository.findUserById(id);
        userRepository.delete(user);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }

    public ResponseEntity<User> updateUser(Long id, User user) {
        User updatedUser = userRepository.findUserById(id);
        updatedUser.setPassword(user.getPassword());
        userRepository.save(updatedUser);

        return ResponseEntity.ok(updatedUser);}
}


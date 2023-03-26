package com.example.bokningsapp.service.userService;

import com.example.bokningsapp.exception.EmailAlreadyExistsException;
import com.example.bokningsapp.exception.ResourceNotFoundException;
import com.example.bokningsapp.exception.UserNotFoundException;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.config.BcryptPasswordConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

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


    //UPDATE METHOD FOR CURRENTLY LOGGED IN USER

    public ResponseEntity<User> updateUser(@PathVariable Long id, User user) {
        var _user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));

            _user.setPassword(user.getPassword());
            User updatedUser = userRepository.save(_user);

        return ResponseEntity.ok(updatedUser);
    }


    public String deleteUserByEmail(String email){

       var user = userRepository.findByEmail(email).orElseThrow();
           userRepository.delete(user);
           return "User was successfully deleted";


    }
}


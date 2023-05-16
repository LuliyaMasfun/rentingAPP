package com.example.bokningsapp.service.userService;

import com.example.bokningsapp.dto.CreateUserDto;
import com.example.bokningsapp.exception.ResourceNotFoundException;
import com.example.bokningsapp.model.Role;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.config.BcryptPasswordConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

import static com.example.bokningsapp.enums.ERole.*;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BcryptPasswordConfig bcryptPasswordConfig;

    private final RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, BcryptPasswordConfig bcryptPasswordConfig, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.bcryptPasswordConfig = bcryptPasswordConfig;
        this.roleRepository = roleRepository;
    }


    public String encryptPassword(String password) {
        return bcryptPasswordConfig.bCryptPasswordEncoder1().encode(password);
    }

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

        return ResponseEntity.ok(updatedUser);
    }


    public ResponseEntity<String> saveUser(CreateUserDto createUserDto){


        if (userRepository.existsByEmail(createUserDto.getEmail())){
            System.out.println(userRepository.existsByEmail(createUserDto.getEmail()));
            return new ResponseEntity<>("User with that email exists",HttpStatus.BAD_REQUEST);
        } else{

          CreateUserDto user1 = new CreateUserDto();

          user1.setFirstName(createUserDto.getFirstName());
          user1.setLastName(createUserDto.getLastName());
          user1.setEmail(createUserDto.getEmail());
          user1.setPassword(createUserDto.getPassword());
          user1.setRoles(user1.getRole());
          User _user = new User();

            System.out.println("Vi testar denna"+user1.getFirstName());

          _user.setFirstName(user1.getFirstName());
          _user.setLastName(user1.getLastName());
          _user.setEmail(user1.getEmail());
          _user.setPassword(user1.getPassword());

          Role role = createUserDto.getRole();

            Role roleUser = roleRepository.findByName(ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));


            if (role == null) {
                Role userRole = roleRepository.findByName(ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
               _user.setRole(userRole);
            } else {
                switch (role.getName().toString()) {
                    case "admin" -> {
                        Role adminRole = roleRepository.findByName(ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        _user.setRole(adminRole);
                    }
                    case "ROLE_MODERATOR" -> {
                        Role moderatorRole = roleRepository.findByName(ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        _user.setRole(moderatorRole);
                    }
                    case "ROLE_USER" -> {
                        Role userRole = roleRepository.findByName(ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        _user.setRole(userRole);
                    }
                    default -> _user.setRole(roleUser);
                }
                }



            System.out.println(_user.getRole().toString());
          userRepository.save(_user);
            return new ResponseEntity<>("User was successfully saved",HttpStatus.OK);

        }

    }
}


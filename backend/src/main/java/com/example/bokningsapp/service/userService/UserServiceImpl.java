package com.example.bokningsapp.service.userService;

import com.example.bokningsapp.exception.EmailAlreadyExistsException;
import com.example.bokningsapp.exception.ResourceNotFoundException;
import com.example.bokningsapp.exception.UserNotFoundException;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.BcryptPasswordConfig;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



@Service
public class UserServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final BcryptPasswordConfig bcryptPasswordConfig;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BcryptPasswordConfig bcryptPasswordConfig) {
        this.userRepository = userRepository;
        this.bcryptPasswordConfig = bcryptPasswordConfig;
    }


    public User createUser(User user) {
        // check for existing user with same email

            User existingUser = userRepository.findUserByEmail(user.getEmail()).orElseThrow();

                // encrypt the password
                user.setPassword(encryptPassword(user.getPassword()));
                userRepository.save(user);
                return user;



    }


    public String encryptPassword(String password) {
        return bcryptPasswordConfig.bCryptPasswordEncoder1().encode(password);   }


    //UPDATE METHOD FOR CURRENTLY LOGGED IN USER

    public User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));
        /*if (!user.getId().equals(getCurrentUserId())) {
            throw new UnauthorizedUserException("Unauthorized user");
            } */

        if (userRepository.existsByEmail(updatedUser.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setEmail(updatedUser.getEmail());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setAdress(updatedUser.getAdress());
        user.setBirthDate(updatedUser.getBirthDate());
        user.setProfileImg(updatedUser.getProfileImg());
        if (updatedUser.getPassword() != null) {
            user.setPassword(encryptPassword(updatedUser.getPassword()));
        }
        return userRepository.save(user);
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


        public void deleteUser(Long id){
            userRepository.deleteById(id);
        }


    public int enableUser(String email) {
        return 0;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(username).orElseThrow( () -> new UsernameNotFoundException("User not found with email: " + username));
    }

/*        @Override
        public int enableUser(String email) {
            return userRepository.enableUser(email);*/
    }










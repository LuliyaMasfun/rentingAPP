package com.example.bokningsapp.security.auth;


import com.example.bokningsapp.enums.ERole;
import com.example.bokningsapp.model.Role;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.security.jwt.JwtResponse;
import com.example.bokningsapp.security.payload.request.LoginRequest;
import com.example.bokningsapp.security.payload.request.SignupRequest;
import com.example.bokningsapp.security.payload.response.AuthenticationResponse;
import com.example.bokningsapp.repository.RoleRepository;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.jwt.JwtService;
import com.example.bokningsapp.security.payload.response.MessageResponse;
import com.example.bokningsapp.service.UserDetailsImpl.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;


    public AuthenticationResponse register(SignupRequest signUpRequest) {

  /*      if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }*/

    /*    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return AuthenticationResponse.builder().
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }*/


        User user = new User();

        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setEmail(signUpRequest.getEmail());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setAddress(signUpRequest.getAddress());
        user.setBirthDate(signUpRequest.getBirthDate());

        System.out.println(user.getFirstName());

            String role = signUpRequest.getRole();

            switch (role) {
                case "ROLE_USER" -> {
                    Role roleUser = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    user.setRole(roleUser);

                }
                case "ROLE_ADMIN" -> {
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    user.setRole(adminRole);
                }
                case "ROLE_MODERATOR" -> {
                    Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    user.setRole(modRole);
                }

                    default -> {
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(userRole);
                        break;
                    }
                }


        System.out.println(user.getRole().toString());
        userRepository.save(user);

        Set<Role> roles = new HashSet<>();
        roles.add(user.getRole());

        /* var jwtToken = jwtService.generateToken(user);*/

        String jwt = jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(jwt).id(user.getId()).roles(roles).build();
    }


    public AuthenticationResponse authenticateUser(AuthenticationResponse authenticationRequest) {


            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getEmail(),
                            authenticationRequest.getPassword()
                    )
            );
            User user = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow(()-> new RuntimeException("User not found"));
             String jwtToken = jwtService.generateToken(user);
        System.out.println("Detta är användarens roll:" + user.getRole().getName().toString());

        Set<Role> roles = new HashSet<>();
        roles.add(user.getRole());

            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .id(user.getId())
                    .roles(roles)
                    .email(user.getEmail())
                    .build();
        }




}

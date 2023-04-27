package com.example.bokningsapp.security.auth;



import com.example.bokningsapp.enums.ERole;
import com.example.bokningsapp.model.Role;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.security.payload.request.LoginRequest;
import com.example.bokningsapp.security.payload.request.SignupRequest;
import com.example.bokningsapp.security.payload.response.AuthenticationResponse;
import com.example.bokningsapp.repository.RoleRepository;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.jwt.JwtService;
import com.example.bokningsapp.security.payload.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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


    public ResponseEntity<?> register(SignupRequest signUpRequest){

  /*      if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }*/

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }


        User user = new User();

        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setEmail(signUpRequest.getEmail());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setAddress(signUpRequest.getAddress());
        user.setBirthDate(signUpRequest.getBirthDate());

        System.out.println(user.getFirstName());


        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "ADMIN":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                        case "MODERATOR":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                         default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
                        user.setRoles(roles);
                        userRepository.save(user);
        user.getRoles().forEach(role -> System.out.println(role.getName()));

                        /* var jwtToken = jwtService.generateToken(user);*/

                        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
                }


    public AuthenticationResponse authenticate(LoginRequest authenticationRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt =jwtService.generateToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("No user with userId " + userDetails.getId() + " found"));

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());



        return ResponseEntity.ok(new JwtResponse(jwt, userDto,roles));    }




}

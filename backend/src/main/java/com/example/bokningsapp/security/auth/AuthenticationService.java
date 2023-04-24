package com.example.bokningsapp.security.auth;



import com.example.bokningsapp.enums.ERole;
import com.example.bokningsapp.model.Role;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.security.payload.request.LoginRequest;
import com.example.bokningsapp.security.payload.request.SignupRequest;
import com.example.bokningsapp.security.payload.response.AuthenticationResponse;
import com.example.bokningsapp.repository.UsersRepo.RoleRepository;
import com.example.bokningsapp.repository.UsersRepo.UserRepository;
import com.example.bokningsapp.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;


    public AuthenticationResponse register(SignupRequest signupRequest){

        User user = User.builder()
                .firstName(signupRequest.getFirstName())
                .lastName(signupRequest.getLastName())
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .phoneNumber(signupRequest.getPhoneNumber())
                .address(signupRequest.getAddress())
                .birthDate(signupRequest.getBirthDate())
                .build();

        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                        case "mod":
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

                         var jwtToken = jwtService.generateToken(user);

                        return AuthenticationResponse.builder()
                                .roles(roles)
                                .token(jwtToken)
                                .email(signupRequest.getEmail())
                                .build();
                }


    public AuthenticationResponse authenticate(LoginRequest authenticationRequest) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()
        )
        );
            var user = userRepository.findByEmail(authenticationRequest.getEmail())
                    .orElseThrow();

        UserDetails userDetails = User.builder()
                .email(user.getEmail())
                .id(user.getId())
                .roles(user.getRoles())
                .birthDate(user.getBirthDate())
                .address(user.getAddress())
                .phoneNumber(user.getPhoneNumber())
                .build();
        var jwtToken = jwtService.generateToken(userDetails);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .id(user.getId())
                .roles(user.getRoles())
                .build();
    }




}
